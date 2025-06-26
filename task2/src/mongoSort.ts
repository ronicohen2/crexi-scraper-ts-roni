export function mongoSort(query: any): Record<string, 1 | -1> {
  return query.sortBy
    ? { [query.sortBy]: query.sortOrder === 'desc' ? -1 : 1 }
    : {}; // if dont have properties, we will dont have sort
}