import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
})
export class CustomFilterPipe implements PipeTransform {
  transform(data: any[], selectedFilters: string[]): string[] {
    if (
      !data ||
      data.length === 0 ||
      !selectedFilters ||
      selectedFilters.length === 0
    ) {
      return data;
    }

    return data.filter((item) => {
      return selectedFilters.some((filters) => item.includes(filters));
    });
  }
}
