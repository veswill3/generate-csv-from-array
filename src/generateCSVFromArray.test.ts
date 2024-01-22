import generateCSVFromArray from './generateCSVFromArray';

describe('generateCSVFromArray', () => {
  it('generates correct CSV from simple array', () => {
    const data = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    const csv = generateCSVFromArray(data, ['name', 'age']);
    expect(csv).toBe('name,age\nJohn,30\nJane,25');
  });

  it('handles custom delimiters', () => {
    const data = [{ name: 'John', age: 30 }];
    const csv = generateCSVFromArray(data, ['name', 'age'], ';');
    expect(csv).toBe('name;age\nJohn;30');
  });

  it('handles nested properties', () => {
    const data = [{ user: { name: 'John' }, age: 30 }];
    const csv = generateCSVFromArray(data, ['user.name', 'age']);
    expect(csv).toBe('user.name,age\nJohn,30');
  });

  it('sanitizes data containing delimiters and quotes', () => {
    const data = [{ name: 'John, "the man"', age: 30 }];
    const csv = generateCSVFromArray(data, ['name', 'age']);
    expect(csv).toBe('name,age\n"John, ""the man""",30');
  });

  it('applies mapping functions correctly', () => {
    const data = [{ name: 'John', age: 30 }];
    const csv = generateCSVFromArray(data, [
      'name',
      ['agePlusTen', (item) => item.age + 10],
    ]);
    expect(csv).toBe('name,agePlusTen\nJohn,40');
  });

  it('handles empty arrays', () => {
    const csv = generateCSVFromArray([], ['name', 'age']);
    expect(csv).toBe('name,age');
  });

  it('handles invalid paths gracefully', () => {
    const data = [{ name: 'John' }];
    const csv = generateCSVFromArray(data, ['name', 'nonexistent']);
    expect(csv).toBe('name,nonexistent\nJohn,');
  });
});
