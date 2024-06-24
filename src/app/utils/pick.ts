export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  query: T,
  keys: K[],
): Partial<T> => {
  const finalQuary: Partial<T> = {};

  for (const key of keys) {
    if (query && Object.hasOwnProperty.call(query, key)) {
      finalQuary[key] = query[key];
    }
  }
  return finalQuary;
};
