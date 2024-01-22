# generate-csv-from-array

A utility to convert an array of data into CSV format allowing you to define each column either through a lodash `get` path or a custom mapping function.

## Installation

```
npm install generate-csv-from-array
```

## Features

- **Column Mapping**: Use lodash `get` paths or custom functions to define how to extract column data.
- **Custom Delimiter**: Customize the delimiter for CSV generation (default: `,`).
- **Data Sanitization**: data containing quotes or the delimiter will be wrapped and escaped.

## Example

```js
import generateCSVFromArray from './src/generateCSVFromArray';
// or
// const generateCSVFromArray = require('generate-csv-from-array');

const people = [
  {
    first: 'John',
    last: 'Doe',
    age: 30,
    contact: {
      email: 'john@example.com',
    },
  },
  {
    first: 'Jane',
    last: 'Doe',
    age: 25,
    contact: {
      telephone: '(555) 867-5309',
      email: 'jane@email.com',
    },
  },
];

const csv = generateCSVFromArray(people, [
  ['name', (person) => `${person.first} ${person.last}`],
  'age',
  'contact.email', // nested lookup
  ['phone', 'contact.telephone'], // custom name
]);

console.log(csv);
```

output

```
name,age,contact.email,phone
John Doe,30,john@example.com,
Jane Doe,25,jane@email.com,(555) 867-5309
```

## API

`generateCSVFromArray(array, paths, [delimiter])`

Generate CSV from an array of data. Configure each column to use either a lodash get path or a mapping function. Optionally you can specify the name of the column (required if using the map fn)

#### Parameters

- `array`: Array of objects to be converted into CSV.
- `paths`: Array of column configurations. Each element can be:
  - A lodash `get` path string (e.g., 'user.name').
  - A tuple of `[columName, getter]` where `getter` is either a lodash `get` path or a mapping function.
- `delimiter` (optional): String specifying the delimiter used to separate columns (default: `,`).
