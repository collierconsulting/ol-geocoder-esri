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
        maxSuggestions: 3,
        countryCode: 'USA',
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
          )).json()
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
        const result = data.map((res) => {
          return {
            lon: res.candidates[0].location.x,
            lat: res.candidates[0].location.y,
            address: {
              name: res.candidates[0].address
            },
            bbox: null
          };
        });
        // console.log(data);
        callback(result);
      });

      // callback(results.suggestions.map(feature => {
      //   return {
      //     lon: 0,
      //     lat: 1,
      //     address: {
      //       name: 'hi'
      //     },
      //     bbox: [1, 2, 3, 4]
      //   };
      // })
      // );
    } else {
      return;
    }
  }
}
