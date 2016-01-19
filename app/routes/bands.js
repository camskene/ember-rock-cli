import Ember from 'ember';

// create Song 'model'
var Song = Ember.Object.extend({
  title: '',
  rating: 0,
  band: ''
});

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

var Band = Ember.Object.extend({
  name: '',

  slug: Ember.computed('name', function() {
    return this.get('name').dasherize();
  })
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
var BandCollection = Ember.Object.extend({
  content: [],
  sortProperties: ['name:desc'],
  sortedContent: Ember.computed.sort('content', 'sortProperties')
});

// instance of BandCollection
var bands = BandCollection.create();

bands.get('content').pushObjects([ledZeppelin, pearlJam, fooFighters]);

export default Ember.Route.extend({
  model: function() {
    return bands;
  }
});
