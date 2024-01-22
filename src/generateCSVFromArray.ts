import get from 'lodash.get';
type PropertyPath = Parameters<typeof get>[1];

const sanitize = <T>(value: T, delimiter: string): string => {
  const str = value?.toString() ?? '';
  if (str?.includes(delimiter) || str?.includes('"')) {
    // Escape double quotes within the field and enclose the field in double quotes
    return `"${str?.replace(/"/g, '""')}"`;
  } else {
    return str;
  }
};

/**
 * Generate CSV from an array of data. Configure each column to use either a
 * lodash get path or a mapping function. Optionally you can specify the name
 * of the column (required if using the map fn)
 * @param array - the array of data to generate CSV from
 * @param paths - array of column configuration
 * @param [delimiter]
 * @returns
 */
const generateCSVFromArray = <T>(
  array: T[],
  paths: (
    | PropertyPath
    | [
        name: string,
        getter:
          | PropertyPath
          | ((item: T, index: number, array: T[]) => string | unknown),
      ]
  )[],
  delimiter = ',',
) => {
  const titleRow: string = paths
    .map((p) => sanitize(Array.isArray(p) ? p[0] : p, delimiter))
    .join(delimiter);
  return [titleRow]
    .concat(
      array.map((element, index, array) =>
        paths
          .map((p) => {
            const value = !Array.isArray(p)
              ? get(element, p, '') // just a path
              : typeof p[1] === 'function' // [name, fn]
              ? p[1](element, index, array)
              : get(element, p[1], ''); // [name, path]
            return typeof value === 'object' ? JSON.stringify(value) : value;
          })
          .map((v) => sanitize(v, delimiter))
          .join(delimiter),
      ),
    )
    .join('\n');
};

export = generateCSVFromArray;
