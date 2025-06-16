export type CrexiProperty = {
    // @TODO missing implementation
    // according to search- list of fields of each property, represent the full data structure of a proprety from Crexi API 
    activatedOn: string;
    askingPrice: number; //the listing price 
    brokerTeamLogoUrl: string;
    brokerageName: string;
    description: string;
    hasFlyer: boolean;
    hasOM: boolean;
    hasVideo: boolean;
    hasVirtualTour: boolean;
    id: number; //id NUMBER from Crexi API 
    isInOpportunityZone: boolean;
    locations: {
        address: string;
        county: string;
        fullAddress: string;
        latitude: number;
        longitude: number;
        state:{
            code: string; //like "NY"
            name: string; //like "New York"
        };
        zip: string;
    }[];
    name: string;
    numberOfGalleryItems: number;
    numberOfImages: number;
    offersDueOn: string;
    recommId: string;
    showCountdownAsDate: boolean;
    squareFootage: number;
    status: string;
    thumbnailUrl: string;
    types: string[]; //like ['Retail'],[ 'Multifamily' ]...
    updatedOn: string;
    urlSlug: string;
    userIsAssetOwner: boolean;
}

//accoarding to CrexiProperty, represent the simplified internal structure used by Monto system 
export type MontoProperty = {
    id: string; //convert from Number to String.
    name: string;
    price: number;
    types: string[];
    location: string;
    status: string;
    imageUrl: string;
}

