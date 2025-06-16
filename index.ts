import { CrexiScraper } from './src/scraper';

(async () => {
    /**
     * Example Place ID for Seattle, WA;
     * https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
     */
    const placeId = "ChIJqaUX8kcuqokRNu1kSMKcz4c"

    const scraper = new CrexiScraper();
    const properties = await scraper.scrape(placeId);
    console.log(properties);

    return properties;
})();
