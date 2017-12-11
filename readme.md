Street Facing - [Demo](https://alexhancock.github.io/street-facing/)
==========

**Street Facing** is an experimental application that runs in the browser and allows you to control the POV on Google Street View with movements of your face and head.

You can check out a demo of it [here](https://alexhancock.github.io/street-facing/).

It is built on top of a few things...

* The Google Maps V3 JavaScript [API](https://developers.google.com/maps/documentation/javascript/), including the Places [library](https://developers.google.com/maps/documentation/javascript/places).
* An open source JavaScript library for tracking head and face movement called [headtrackr.js](https://github.com/auduno/headtrackr)
* (It also depends on [underscore.js](http://underscorejs.org) and [backbone.js](http://backbonejs.org))

### Browser Support ###

* Chrome (21+)
* Opera (Support coming soon)

### Usage ###

Once all the code is included, the following call initiates the app on any page...
```js
var mainView = new Street_Facing_View({
    el: '#main_street_view'
});
```

I might spend some time in the near future modularizing and generalizing this code, so people can drop it into any project if there is interest.

** One thing to note when developing locally - Most browsers do not let you use [getUserMedia](http://dev.w3.org/2011/webrtc/editor/getusermedia.html) when serving HTML files directly off the filesystem. It is best to use a simple HTTP server in something like Python or Node to serve the files you're working with.
