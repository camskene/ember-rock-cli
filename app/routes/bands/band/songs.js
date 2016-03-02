import Ember from 'ember';
import { capitalize } from 'ember-rock-cli/helpers/capitalize';

export default Ember.Route.extend({
  model() {
    return this.modelFor('bands.band');
  },

  resetController(controller) {
    controller.set('songCreationStarted', false);
  },

  actions: {
    didTransition() {
      var model = this.modelFor('bands.band');
      document.title = `${capitalize(model.get('name'))} songs - Rock & Roll`;
    },

    createSong() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        rating: null,
        band: band
      });

      song.save().then(function() {
        band.save();
        controller.set('title', '');
      });
    }
  }
});
