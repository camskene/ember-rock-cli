import Ember from 'ember';
import Band from '../models/band';
import Song from '../models/song';

// create instances of Song with create method
var blackDog = Song.create({
  title: 'Black Dog',
  band: 'Led Zeppelin',
  rating: 3
});

var yellowLedbetter = Song.create({
  title: 'Yellow Ledbetter',
  band: 'Pearl Jam',
  rating: 4
});

var daughter = Song.create({
  title: 'Daughter',
  band: 'Pearl Jam',
  rating: 5
});

var pretender = Song.create({
  title: 'The Pretender',
  band: 'Foo Fighters',
  rating: 2
});

var ledZeppelin = Band.create({
  name: 'Led Zeppelin',
  songs: [blackDog]
});

var pearlJam = Band.create({
  name: 'Pearl Jam',
  songs: [yellowLedbetter, daughter]
});

var fooFighters = Band.create({
  name: 'Foo Fighters',
  songs: [pretender]
});

// Define a 'collection' to hold instances of Band instances
var BandsCollection = Ember.Object.extend({
  content: [],
  sortProperties: ['name:desc'],
  sortedContent: Ember.computed.sort('content', 'sortProperties')
});

// instance of BandsCollection
var bands = BandsCollection.create();

bands.get('content').pushObjects([ledZeppelin, pearlJam, fooFighters]);

export default Ember.Route.extend({
  model: function() {
    return bands;
  },

  actions: {
    createBand: function() {
      // get name value that was set on the controller via the input
      var name = this.get('controller').get('name');

      // create new Band and set it's name attribute
      var band = Band.create({name: name});

      // add our band to the BandsCollection
      bands.get('content').pushObject(band);

      // reset name property to empty string
      this.get('controller').set('name', '');

      // transition to newly created band page
      this.transitionTo('bands.band.songs', band);
    }
  }
});
