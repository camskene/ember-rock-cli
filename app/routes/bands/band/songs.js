import Ember from 'ember';
import wait from 'ember-rock-cli/utils/wait';

export default Ember.Route.extend({
  model() {
    return wait(this.modelFor('bands.band'), 3 * 1000);
  },

  resetController(controller) {
    controller.set('songCreationStarted', false);
  },

  actions: {
    didTransition: function() {
      var band = this.modelFor('bands.band');

      document.title = `${band.get('name')} songs - Rock & Roll`;
    },

    createSong: function() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });

      song.save().then(function() {
        controller.set('title', '');
      });
    }
  }
});
