import { test } from 'qunit';
import moduleForAcceptance from 'ember-rock-cli/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

moduleForAcceptance('Acceptance | bands');

var server;

test('List bands', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function() {
      var response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Radiohead'
            }
          },
          {
            id: 2,
            type: 'bands',
            attributes: {
              name: 'Long Distance Calling'
            }
          }
        ]
      };

      return [200, {'Content-Type': 'applicaton/vnd.api+json'}, JSON.stringify(response)];
    });
  });


  visit('/bands');

  andThen(function() {
    assert.equal(find('.band-link').length, 2, 'All band links are rendered');
    assert.equal(find('.band-link:contains("Radiohead")').length, 1, 'First band link contains the band name');
    assert.equal(find('.band-link:contains("Long Distance Calling")').length, 1, 'The other band link contains the band name');
  });
});


test('Create a new band', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function() {
      var response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Radiohead'
            }
          }
        ]
      };

      return [200, {'Content-Type': 'applicaton/vnd.api+json'}, JSON.stringify(response)];
    });

    this.post('/bands', function() {
      var response = {
        data: [
          {
            id: 2,
            type: 'bands',
            attributes: {
              name: ''
            }
          }
        ]
      };

      return [200, {'Content-Type': 'applicaton/vnd.api+json'}, JSON.stringify(response)];
    });
  });


  visit('/bands');

  fillIn('.new-band', 'Led Zeppelin');

  click('.new-band-button');

  andThen(function() {
    assert.equal(find('.band-link').length, 2, 'All band links are rendered');
    assert.equal(find('.band-link:contains("Radiohead")').length, 1, 'First band link contains the band name');
    assert.equal(find('.band-link:contains("Led Zeppelin")').length, 1, 'The other band link contains the band name');
  });
});


test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function() {
      var response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Radiohead'
            }
          }
        ]
      };

      return [200, {'Content-Type': 'applicaton/vnd.api+json'}, JSON.stringify(response)];
    });

    this.post('/songs', function() {
      var response = {
        data: [
          {
            id: 1,
            type: 'songs',
            attributes: {
              name: 'Killer Cars'
            }
          }
        ]
      };

      return [200, {'Content-Type': 'applicaton/vnd.api+json'}, JSON.stringify(response)];
    });

    this.get('/bands/1/songs', function() {
      return [200, {'Content-Type': 'application/vnd.api+json'}, JSON.stringify({data: []})];
    });
  });


  visit('/bands');

  click('.band-link:contains("Radiohead")');
  click('a:contains("create one")');

  fillIn('.new-song', 'Killer Cars');

  click('.new-song-button');

  andThen(function() {
    assert.equal(find('.song:contains("Killer Cars")').length, 1, 'Creates a song');
  });
});


test('Sort songs in various ways', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, [{
      id: 1,
      attributes: {
        name: 'Stone Temple Pilots'
      }
    }]);


    httpStubs.stubSongs(this, 1, [{
      id: 1,
      attributes: {
        title: 'Interstate Love Song',
        rating: 5
      }
    }, {
      id: 2,
      attributes: {
        title: 'Lounge Fly',
        rating: 4
      }
    }, {
      id: 3,
      attributes: {
        title: 'Meat Plow',
        rating: 4
      }
    }, {
      id: 4,
      attributes: {
        title: 'Vasoline',
        rating: 5
      }
    }]);

    visit('/bands');

    click('.band-link:contains("Stone Temple Pilots")');

    andThen(function() {
      assert.equal(currentURL(), '/bands/1/songs');

      assert.equal(find('.song:first:contains("Interstate Love Song")').length, 1, 'The first song is highest ranked, first in Alphabet');

      assert.equal(find('.song:contains("Interstate Love Song")').length, 1, 'The last song is highest ranked, first in Alphabet');
    });
  });
});


/*

function assertTrimmedText(app, assert, selector, text, errorMessage) {
  var element = findWithAssert(selector);
  var elementText = element.text().trim();
  assert.equal(elementText, text, errorMessage);
}

function assertLength(app, assert, selector, length, errorMessage) {
  assert.equal(find(selector).length, length, errorMessage);
}

function assertElement(app, assert, selector, errorMessage) {
  assert.equal(find(selector).length, 1, errorMessage);
}

*/
