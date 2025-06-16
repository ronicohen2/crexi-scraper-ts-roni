import { ENTRIES_PER_PAGE } from "./constants";
import { CrexiProperty, MontoProperty } from "./types";
/*
 * Search Crexi properties by Google Place ID.
 */
export async function searchCrexiProperties(rootUrl: string, placeId: string, page: number = 1): Promise<CrexiProperty[]> {
    // @TODO implementation.
    //calculate how many page skip for pagination.
    const offset: number = ENTRIES_PER_PAGE * (page - 1);

    const pageSize = 60;
    const body = {
        "locations": [
            {
                "placeId": `${placeId}`, //google placeId for the target city.
                "type": "city",
            }
        ],
        "count": 1500, //maximum number of result
        "mlScenario": "Recombee-Recommendations",
        "offset": offset,
        "userId": "$device:197545b2f6043e-00921e1c45f46-18525636-157188-197545b2f6043e",
        "sortDirection": "Descending",
        "sortOrder": "rank",
        "includeUnpriced": true
    }

    const response = await fetch(`${rootUrl}/assets/search`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "client-timezone-offset": "3",
            "content-type": "application/json",
            "mixpanel-distinct-id": "$device:197545b2f6043e-00921e1c45f46-18525636-157188-197545b2f6043e",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://www.crexi.com/",
            "Referrer-Policy": "origin-when-cross-origin"
        },
        "body": JSON.stringify(body),
        "method": "POST",
    });

    //check if the HTTP response was successful.
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    //validate that the response is JSON
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data =  isJson ? await response.json() : await response.text(); //if isJson so parsing as json else parsing as text. 

    if (!response.ok || !isJson) {
        throw new Error(`Failed to fetch properties from Crexi: ${response.statusText}`, { cause: data });
    }

    return data.data as CrexiProperty[];
}


/**
 * Map a raw property.
 */
export function mapMontoProperty(crexiProperty: CrexiProperty): MontoProperty {
    // @TODO implementation.
    const primaryLocation = crexiProperty.locations?.[0]; // go to the first value in the array, just if its exist. if not undifiend.
    const location = primaryLocation?.fullAddress || primaryLocation?.address || ''; //if found on the first try- return. if not- if have just address- return. if not return empty qoute.

    return {
        id: crexiProperty.id.toString(),
        name: crexiProperty.name,
        price: crexiProperty.askingPrice || 0,
        types: crexiProperty.types,
        location: location,
        status: crexiProperty.status,
        imageUrl: crexiProperty.thumbnailUrl || '',
    } as MontoProperty;
}
