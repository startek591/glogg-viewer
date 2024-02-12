import { CustomFilterPipe } from './custom-filter.pipe';

describe('CustomFilterPipe', () => {
  let pipe = new CustomFilterPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter data based on selectedFilters', () => {
    const data = ['apple', 'banana', 'cherry', 'date'];
    const selectedFilters = ['an', 'che'];

    const filteredData = pipe.transform(data, selectedFilters);

    expect(filteredData).toEqual(['banana', 'cherry']);
  });

  it('should return the original data when data is empty', () => {
    const data: string[] = [];
    const selectedFilters = ['an', 'che'];

    const filteredData = pipe.transform(data, selectedFilters);

    expect(filteredData).toEqual([]);
  });

  it('should return the original data when selectedFilters is empty', () => {
    const data = ['apple', 'banana', 'cherry', 'date'];
    const selectedFilters: string[] = [];

    const filteredData = pipe.transform(data, selectedFilters);

    expect(filteredData).toEqual(data);
  });

  it('should return the original data when both data and selectedFilters are empty', () => {
    const data: string[] = [];
    const selectedFilters: string[] = [];

    const filteredData = pipe.transform(data, selectedFilters);

    expect(filteredData).toEqual([]);
  });
});
