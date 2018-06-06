/**
 * @class OpenStreet
 */
export class ESRIWorld {
  /**
   * @constructor
   */
  constructor() {

    this.settings = {
      url: {
        suggest: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest',
        find: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates',
      },
      params: {
        text: '',
        f: 'json',
        location: null,
        searchExtent: null,
        category: '',
        maxSuggestions: 4,
        countryCode: '',
      }
    };
  }

  getData(suggestions) {
    const places = Promise.all(
      suggestions.map(
        place =>
          fetch(
            `${this.settings.url.find}?singleLine="
            ${place.text}"&magicKey="
            ${place.magicKey}"&f=json`
          ).then(res => res.json())
      )
    );
    return places;
  }

  getParameters(opt) {
    return {
      url: this.settings.url.suggest,
      params: {
        text: opt.query,
        f: this.settings.params.f,
        maxSuggestions: opt.maxSuggestions
          || this.settings.params.maxSuggestions,
        countryCode: opt.countryCode
          || this.settings.params.countryCode,
      }
    };
  }

  handleResponse(results, callback) {
    if (results && results.suggestions && results.suggestions.length) {
      this.getData(results.suggestions).then(data => {
        callback(data);
      });
    } else {
      return;
    }
  }
}
