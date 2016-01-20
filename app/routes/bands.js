import Ember from 'ember';
import Band from '../models/band';
import Song from '../models/song';


export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('band');
  },

  actions: {
    didTransition: function() {
      document.title = 'Bands - Rock & Roll';
    },

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
