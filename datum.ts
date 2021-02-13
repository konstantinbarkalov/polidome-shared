export type providerKeyT = 'openWeather' |
                            'foreca' |
                            'yandex' |
                            'gidromet';


export type ByProviderT<valueG> = {
    [key in providerKeyT]: valueG;
}
export class HourReading {
    constructor (
        public temperature: number,
    ) {
    }
    toPlainTree() {
        return {
            temperature: this.temperature,
        }
    }
    static fromPlainTree(plainTree: any) {
        const temperature = plainTree.temperature;
        return new HourReading(temperature);
    }
}

export class HourForecast {
    constructor (
        public temperature: {
            min: number,
            max: number,
            mean: number,
        },
    ) {
    }
    toPlainTree() {
        return {
            temperature: {
                min: this.temperature.min,
                mean: this.temperature.mean,
                max: this.temperature.max,
            }
        }
    }
    static fromPlainTree(plainTree: any) {
        const temperature = {
                min: plainTree.min,
                mean: plainTree.mean,
                max: plainTree.max,
        }
        return new HourForecast(temperature);
    }

}

export class HourProviderData {
    constructor (
        public reading: HourReading,
        public forecasts: HourForecast[],
    ) {
    }
    toPlainTree() {
        return {
            reading: this.reading.toPlainTree(),
            forecasts: this.forecasts.map(element => element.toPlainTree()),
        }
    }
    static fromPlainTree(plainTree: any) {
        const reading = HourReading.fromPlainTree(plainTree.reading);
        const forecastPlainTrees: any[] = plainTree.forecasts;
        const forecasts: HourForecast[] = forecastPlainTrees.map(forecastPlainTree => HourForecast.fromPlainTree(forecastPlainTree));
        return new HourProviderData(reading, forecasts);
    }
}

export class HourReferenceData {
    constructor (
        public reading: HourReading,
    ) {
    }
    toPlainTree() {
        return {
            reading: this.reading.toPlainTree(),
        }
    }
    static fromPlainTree(plainTree: any) {
        const reading = HourReading.fromPlainTree(plainTree.reading);
        return new HourReferenceData(reading);
    }

}

export class HourData {
    constructor (
        public byProvider: ByProviderT<HourProviderData>,
        public reference: HourReferenceData,
        public hourstep: number,
    ) {

    }
    toPlainTree() {
        return {
            byProvider: {
                openWeather: this.byProvider.openWeather.toPlainTree(),
                foreca: this.byProvider.foreca.toPlainTree(),
                yandex: this.byProvider.yandex.toPlainTree(),
                gidromet: this.byProvider.gidromet.toPlainTree(),
            },
            reference: this.reference.toPlainTree(),
            hourstep: this.hourstep,
        }
    }
    static fromPlainTree(plainTree: any) {
        const byProvder = {
            openWeather: HourProviderData.fromPlainTree(plainTree.byProvder.openWeather),
            foreca: HourProviderData.fromPlainTree(plainTree.byProvder.foreca),
            yandex: HourProviderData.fromPlainTree(plainTree.byProvder.yandex),
            gidromet: HourProviderData.fromPlainTree(plainTree.byProvder.gidromet),
        }
        const reference = HourReferenceData.fromPlainTree(plainTree.reference);
        const hourstep = plainTree.hourstep;
        return new HourData(byProvder, reference, hourstep);
    }
}

export class HourDatumBundle {
    constructor (
        public datum: HourData[],
    ) {

    }
    toPlainTree() {
        return {
            datum: this.datum.map(element => element.toPlainTree()),
        }
    }
    static fromPlainTree(plainTree: any) {
        const dataPlainTrees: any[] = plainTree.datum;
        const datum: HourData[] = dataPlainTrees.map(dataPlainTree => HourData.fromPlainTree(dataPlainTree));
        return new HourDatumBundle(datum);
    }
}


