# Ember-rock-cli

An app to catalog your music collection based on Balint Erdi's excellent 'Rock and Roll with Ember'.

## Demo

View a working example - [demo](http://sheltered-eyrie-99245.herokuapp.com/bands).

## About

This application has the following features:

- A "dashboard" where all bands are listed on the left (with the selected band highlighted) and the songs belonging to the selected band on the right.
- A streamlined – yet very simple – flow to add a new band and then start adding songs to it.
- Pulls data from a remote API.
- Prevents users from losing unsaved changes by warning them when they're about to leave a form that's been edited.
- A bunch of tests, both high and low-level to safeguard our application.
- The ability to sort the songs based on multiple properties, selectable by the user.
- Search songs.
- Make sure all band names and song titles have the correct case, no matter how the user entered them.
- A handful of animations to give more nuanced feedback about user actions.
- Extract a component in the application into an Ember [addon](https://github.com/camskene/ember-cli-star-rating).
- Use some state-of-the-art JavaScript ES2015 (ES6).


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* `git push heroku master`

## Further Reading / Useful Links

* [Rock and Roll with Ember](http://balinterdi.com/rock-and-roll-with-emberjs/)
* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

