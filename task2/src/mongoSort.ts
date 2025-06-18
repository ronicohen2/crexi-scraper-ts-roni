export function mongoSort(query: any): Record<string, 1 | -1> {

    const { sortBy, sortOrder = 'asc' } = query as {
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    };

    const validSortFields = ['createdAt', 'price'];

    if (sortBy && validSortFields.includes(sortBy)) {
        return {
          [sortBy]: sortOrder === 'desc' ? -1 : 1
        };
      }
    
    return {};
}  