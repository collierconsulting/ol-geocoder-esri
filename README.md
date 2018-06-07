# OpenLayers Control Geocoder

A geocoder extension for [OpenLayers](http://openlayers.org/). **Requires** OpenLayers **v3.11.0** or higher.

 This fork adds the [ESRI World Geocoding service](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm) as a provider.

![geocoder anim](https://raw.githubusercontent.com/jonataswalker/ol-geocoder/screenshots/images/anim.gif)

## Demo
You can see [here a demo](http://rawgit.com/jonataswalker/ol-geocoder/master/examples/control-nominatim.html) or on [jsFiddle](http://jsfiddle.net/jonataswalker/c4qv9afb/) if you prefer. There is also a [demo of creating a custom provider](http://rawgit.com/jonataswalker/ol-geocoder/master/examples/custom-provider.html)

## Providers
The plugin supports (for now) the following providers:

* [OSM](http://www.openstreetmap.org/)/[Nominatim](http://wiki.openstreetmap.org/wiki/Nominatim) &mdash; `'osm'`.
* [MapQuest Geocoding API](http://open.mapquestapi.com/nominatim/) &mdash; requires KEY  &mdash; `'mapquest'`.
* [Photon](http://photon.komoot.de/)  &mdash; `'photon'`.
* [Mapzen Search/Pelias](https://mapzen.com/projects/search) &mdash; requires KEY  &mdash; `'pelias'`.
* [Bing](https://msdn.microsoft.com/pt-br/library/ff701713.aspx) &mdash; requires KEY  &mdash; `'bing'`.
* [OpenCage](https://geocoder.opencagedata.com) &mdash; requires KEY  &mdash; `'opencage'`.
* [ESRI World Geocoding Service](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm) &mdash; `'esri'`.

### Custom Providers
You can also write your own provider, passing an instance of it to the `Geocoder` constructor via the `provider` property of the options argument.

For an example of defining and using a custom provider see [`examples/custom-provider.js`](examples/custom-provider.js)

Custom providers must implement the following methods:

#### `getParameters(options)`

* `options` `{Object}`
    * `query` Search string entered by the user;
    * `lang` `{string}` Preferable language;
    * `limit` `{number}` Limit of results;

#### `handleResponse(results)`

* `results` `{Object}` Parsed JSON response from API call

## How to use it?

##### NPM
`npm install ol-geocoder`

##### Self hosted
Download [latest release](https://github.com/josh-channin/ol-geocoder/releases/latest) and (obviously) load CSS and Javascript.

##### Instantiate with some options and add the Control
```javascript
var geocoder = new Geocoder('nominatim', {
  provider: 'mapquest',
  key: '__some_key__',
  lang: 'pt-BR', //en-US, fr-FR
  placeholder: 'Search for ...',
  targetType: 'text-input',
  limit: 5,
  keepOpen: true
});
map.addControl(geocoder);
```

##### Listen and do something when an address is chosen
```javascript
geocoder.on('addresschosen', function(evt){
  var feature = evt.feature,
      coord = evt.coordinate,
      address = evt.address;
  // some popup solution
  content.innerHTML = '<p>'+ address.formatted +'</p>';
  overlay.setPosition(coord);
});
```

# API

## Constructor

#### `new Geocoder(type, options)`

- `type` `{String}` - Maybe later we will have other types like `'reverse'`. So for now just pass `'nominatim'`.

- `options` is an object with the following possible properties:
  * `provider`             : `'osm'` (default), `'mapquest'`, `'photon'`, `'pelias'`, `'bing'`, `'opencage'`, custom provider instance; Your preferable provider;
  * `key`                  : `''`; API Key if required;
  * `autoComplete`         : `false`; Search as you type;
  * `autoCompleteMinLength`: `2`; The minimum number of characters to trigger search;
  * `placeholder`          : `'Search for an address'`; Placeholder for text input;
  * `targetType`           : `'glass-button'`; Can also be `'text-input'`;
  * `featureStyle`         : `ol.style.Style`; Feature style;
  * `lang`                 : `'en-US'`; Preferable language;
  * `limit`                : `5`; Limit of results;
  * `countrycodes`         : `''`; Only valid for `osm` and `mapquest`; Limit search results to a specific country (or a list of countries). This is an [ISO 3166-1alpha2 code] (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), e.g. `gb` for the United Kingdom, `br` for Brazil, etc;
  * `keepOpen`             : `false`; Whether the results keep openned;
  * `preventDefault`       : `false`; Whether panning (and creating marker) when an address is chosen;
  * `debug`                : `false`; If true logs provider's response;

## Instance Methods

#### `getLayer()`
Returns the layer `{ol.layer.Vector}` created by Geocoder control.

#### `getSource()`
Returns the source `{ol.source.Vector}` created by Geocoder control.

#### `setProvider(provider)`

`@param {String} provider`

Sets a new provider.

#### `setProviderKey(key)`

`@param {String} key`

Sets provider key.

## Events

##### Triggered when an address is chosen
```javascript
geocoder.on('addresschosen', function(evt) {
  // it's up to you
  console.info(evt);
});
```
