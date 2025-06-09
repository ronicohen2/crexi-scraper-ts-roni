import { CrexiProperty, MontoProperty } from "./types.js";

/**
 * Search Crexi properties by Google Place ID.
 */
export async function searchCrexiProperties(rootUrl: string, placeId: string, page: number = 1): Promise<CrexiProperty[]> {
    // @TODO implementation.
    return {};
}

/**
 * Map a raw property.
 */
export function mapMontoProperty(crexiProperty: CrexiProperty): MontoProperty {
    // @TODO implementation.
    return {};
}
