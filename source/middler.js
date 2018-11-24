'use strict';
/* global mountMatchesUrl */

/*----------- Helper function you can use -----------*/

// `mountMatchesUrl` is a function defined in `helper.js`, accessible here.

// It returns true if mount path matches beginning of url.
// Properly ignores query string and handles implicit trailing slash.
// Check out the `helper.js` file for more details & examples.

/*--------- Main App Constructor and Factory --------*/

var App = function () {
  this._chain = [];
};

var Middler = function(){
  return new App();
};

/*======== Follow the spec in middler.spec.js ========*/

// user interface (API) for registering middleware
App.prototype.use = function(...args) {
  // default root mount case
  // all args are middleware functions that are put on the default root dir
  if(!(typeof(args[0]) === 'string')){
    args.map(midFunc =>{ 
        this._chain.push({mount: '/', middleware: midFunc});
      });
  }

  // custom mounting on given route 
  // args[0] always holds the route (passed as a string), the rest of args are the middleware functions
  else{
    for(let i = 1; i < args.length; i++){
      this._chain.push({mount: args[0], middleware: args[i]});
    }
  }
};

// internal method triggered by a hypothetical HTTP request
App.prototype._handleHTTP = function(request, response) {
  // ▼ DEFINE THIS, CALLED ONCE PER HTTP REQUEST ▼

  function next(){
    // ▼ DEFINE THIS, CALLED ONCE FOR EACH MIDDLEWARE ▼

  }
  next(); // starts the chain
};
