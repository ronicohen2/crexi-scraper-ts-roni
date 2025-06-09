import { CrexiProperty } from "./types.js";
import { PORTAL_NAME, ROOT_URL } from './constants.js';
import { mapMontoProperty } from './utils.js';

/** Class representing a Crexi scraper. */
export class CrexiScraper {
    readonly #name: string;
    readonly #rootUrl: string;

    constructor() {
        this.#name = PORTAL_NAME;
        this.#rootUrl = ROOT_URL;
    }

    async scrape(placeId: string): Promise<CrexiProperty[]> {
        console.info(`${this.#name} scraper started.`);
        const properties = [];

        // @TODO: Implementation

        console.info(`${this.#name} scraper ended.`);
        return properties.map(property => mapMontoProperty(property));
    }
}
