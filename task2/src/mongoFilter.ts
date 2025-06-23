export function mongoFilter(query: any): Record<string, any> {
    const filter: Record<string, any> = {};

    const { stateCode, price, createdAt } = query as {
        stateCode?: string;
        price?: number;
        createdAt?: string;
    };
    if (stateCode) {
        filter.stateCode = stateCode;
    }
    if (price && !isNaN(Number(price))) {
        filter.price = Number(price);
    }
    if (createdAt && !isNaN(Date.parse(createdAt))) {
        filter.createdAt = new Date(createdAt);
    }    
    return filter;
}  