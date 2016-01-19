import Ember from 'ember';

export default Ember.Controller.extend({

  title: '',

  bandName: Ember.computed('model.name', function() {
    return this.get('model.name');
  }),

  isAddButtonDisabled: Ember.computed('title', function() {
    return Ember.isEmpty(this.get('title'));
  }),

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  songCreationStarted: false,

  actions: {
    updateRating: function(params) {
      var song = params.item;
      var rating = params.rating;

      song.set('rating', rating);
    },

    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    }
  }
});
