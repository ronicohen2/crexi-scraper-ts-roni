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
    if (price) {
        filter.price = Number(price);
    }
    if (createdAt) {
        filter.createdAt = new Date(createdAt);
    }

    return filter;
}  