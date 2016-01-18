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

var pretender = Song.create({
  title: 'The Pretender',
  band: 'Foo Fighters',
  rating: 2
});


// Define a 'collection' to hold instances of Song
var SongCollection = Ember.Object.extend({
  content: [],
  sortProperties: ['rating:desc'],
  sortedContent: Ember.computed.sort('content', 'sortProperties')
});

// instantiate SongCollection
var songs = SongCollection.create();

// add our songs to the collection
songs.get('content').pushObjects([blackDog, yellowLedbetter, pretender]);

export default Ember.Controller.extend({
  songs: songs
});
