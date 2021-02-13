export class OpenWeatherCrawledData {
  constructor(public crawledTimestamp: number,
              public weatherRawResponse: any,
              public forecastRawResponse: any) {
  }
};

export class ForecaCrawledData {
  constructor(public crawledTimestamp: number,
              public weatherRawResponse: any,
              public forecastRawResponse: any) {
}
};

export class YandexCrawledData {
  constructor(public crawledTimestamp: number,
              public rawResponse: any) {
  }
};


export class GidrometCrawledData {
  constructor(public crawledTimestamp: number,
              public rawResponse: any) {
  }
};
