/*
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function() {

// Estblish polyfill scope. We do this here to store flags. Flags are not 
// supported in the build.
window.HTMLImports = window.HTMLImports || {flags:{}};  

// Flags. Convert url arguments to flags
var flags = {};
if (!flags.noOpts) {
  location.search.slice(1).split('&').forEach(function(o) {
    o = o.split('=');
    o[0] && (flags[o[0]] = o[1] || true);
  });
}

// Load.
var file = 'HTMLImports.js';

var modules = [
  'src/base.js',
  '../WeakMap/WeakMap.js',
  '../MutationObservers/MutationObserver.js',
  'src/path.js',
  'src/xhr.js',
  'src/Loader.js',
  'src/Observer.js',
  'src/parser.js',
  'src/importer.js',
  'src/dynamic.js',
  'src/boot.js'
];

var src = 
  document.querySelector('script[src*="' + file + '"]').getAttribute('src');
var basePath = src.slice(0, src.indexOf(file));

modules.forEach(function(f) {
  document.write('<script src="' + basePath + f + '"></script>');
});

// exports 
HTMLImports.flags = flags;

})();