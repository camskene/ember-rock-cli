import { test } from 'qunit';
import moduleForAcceptance from 'ember-rock-cli/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

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
