import Ember from 'ember';
import { capitalize } from 'ember-rock-cli/helpers/capitalize';

export default Ember.Controller.extend({

  title: '',

  bandName: Ember.computed('model.name', function() {
    return capitalize(this.get('model.name'));
  }),

  isAddButtonDisabled: Ember.computed('title', function() {
    return Ember.isEmpty(this.get('title'));
  }),

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  songCreationStarted: false,

  actions: {
    updateRating(params) {
      var song = params.item;
      let rating = params.rating;

      if (song.get('rating') === rating) {
        rating = 0;
      }

      song.set('rating', rating);

      song.save();
    },

    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    // Action initiated when one of the sort buttons is clicked.
    // It sets the the `sortBy` property to the value passed along with the action.
    setSorting(option) {
      this.set('sortBy', option);
    }
  },

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's'
  },

  searchTerm: '',

  sortBy: 'ratingDesc',

  // Returns a new array of songs that match our search term (or parts thereof)
  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {

    return this.get('model.songs').filter((song) => {
      var searchTerm = this.get('searchTerm').toLowerCase();
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  // Updates when `sortBy` changes and returns an array of properties we want to sort by.
  sortProperties: Ember.computed('sortBy', function() {
    var options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  // Returns a sorted array which we iterate inside the template
  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),
});

// How the Sorting Works
// 1. Clicking a sort button triggers the setSorting action.
// 2. The value passed along with that action is set as the value of `sortBy`.
// 3. When `sortBy` is updated `sortProperties` returns an array containing the new values we want to sort by.
// 4. The `sortedSongs` array is then updated.
