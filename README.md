## Moved 
This repo has moved to https://github.com/Polymer/webcomponentsjs

## Learn the tech

### Why HTML Imports?

This repository contains a Javascript polyfill for the [HTML Imports](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/imports/index.html) specification.

HTML Imports are a way to include and reuse HTML documents in other HTML documents. As `<script>` tags let authors include external Javascript in their pages, imports let authors load full HTML resources.  In particular, imports let authors include [Custom Element](https://github.com/Polymer/CustomElements) definitions from external URLs.

### Basic usage

For HTML imports use the `import` relation on a standard `<link>` tag, for example:

    <link rel="import" href="import-file.html">

## Polyfill details

### Getting Started

Include the `html-imports.js` or `html-imports.min.js` (minified) file in your project.

    <script src="HTMLImports/html-imports.js"></script>

`html-imports.js` is the debug loader and uses `document.write` to load additional modules. 
Use the minified version (`html-imports.min.js`) if you need to load the file dynamically.

### Polyfill Notes

In imported documents, `href` and `src` attributes in HTML, and `url` properties in CSS files, are relative to the location of the imported document, not the main document.

The HTML Imports polyfill begins processing link tags when the `DOMContentLoaded` event fires. To know when loading is complete, listen for the `HTMLImportsLoaded` event on `document` or `window`.

Example:

    <script>
    window.addEventListener('HTMLImportsLoaded', function(e) {
      // all imports loaded
    });
    </script>

The polyfill loads linked stylesheets, external scripts, and nested HTML imports, but does not parse any data in the loaded resources. For parsing imports, combine HTML Imports with  [Custom Elements](https://github.com/Polymer/CustomElements). As long as the HTML Imports is loaded first, the Custom Elements polyfill will detect it, and process all imports when `HTMLImportsLoaded` event fires.

#### The WebComponentsReady event

Under native imports, `<script>` tags in the main document block the loading of imports. This is to ensure the imports have loaded and any registered elements in them have been upgraded. This native behavior is difficult to polyfill so the [HTML Imports polyfill](https://github.com/Polymer/HTMLImports) doesn't try. Instead the `WebComponentsReady` event is a stand in for this behavior:

    <script>
      window.addEventListener('WebComponentsReady', function(e) {
        // imports are loaded and elements have been registered
      });
    </script>

#### Other notes

- In a native HTML Imports, `document.currentScript.ownerDocument` references the import document itself. In the polyfill use `document._currentScript.ownerDocument` (note the underscore).

## Tools & Testing

For running tests or building minified files, consult the [tooling information](http://polymer-project.org/resources/tooling-strategy.html).
