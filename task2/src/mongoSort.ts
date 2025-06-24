export function mongoSort(query: any): Record<string, 1 | -1> {
  const sortBy = typeof query.sortBy === 'string' ? query.sortBy : undefined;
  const sortOrder = query.sortOrder === 'desc' ? -1 : 1;

  const validSortFields = ['createdAt', 'price'];

  if (sortBy && validSortFields.includes(sortBy)) {
      return { [sortBy]: sortOrder };
  }

  return {};
}
