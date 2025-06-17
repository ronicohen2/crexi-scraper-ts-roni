import { CrexiProperty, MontoProperty } from "./types";
import { ENTRIES_PER_PAGE, PORTAL_NAME, ROOT_URL, TIME_BETWEEN_REQUESTS} from './constants';
import { mapMontoProperty, searchCrexiProperties } from './utils';
import { resolve } from "path";

/** Class representing a Crexi scraper. */
export class CrexiScraper {
    readonly #name: string;
    readonly #rootUrl: string;

    constructor() {
        this.#name = PORTAL_NAME;
        this.#rootUrl = ROOT_URL;
    }

    async scrape(placeId: string): Promise<MontoProperty[]> {
        console.info(`${this.#name} scraper started.`);
        const allProperties: CrexiProperty[] = [];
        let page = 1;

        do {
            try {
                const propertiesPerPage = await searchCrexiProperties(this.#rootUrl, placeId, page);
                allProperties.push(...propertiesPerPage)
                page++;
                await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_REQUESTS));
            } catch (error) {
                console.error(`Error fetching page ${page}:`, error);
                break;
            }
        } while (allProperties.length === ENTRIES_PER_PAGE && allProperties.length < 1500);

        console.info(`${this.#name} scraper ended.`);
        return allProperties.map(property => mapMontoProperty(property));
    }
}
