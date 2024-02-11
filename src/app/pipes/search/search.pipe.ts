import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(data: string[], searchText: string): string[] | null {
    if (!data || !searchText) {
      return data;
    }

    searchText = searchText.toLowerCase();

    const filteredData = data.filter((item: string) =>
      item.toLowerCase().includes(searchText)
    );

    return filteredData.length > 0 ? filteredData : null;
  }
}
