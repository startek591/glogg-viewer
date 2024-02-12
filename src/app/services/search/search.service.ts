import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');
  private selectedFilterSubject = new BehaviorSubject<string[]>([]);

  searchText$ = this.searchTextSubject.asObservable();
  selectedFilter$: Observable<string[]> =
    this.selectedFilterSubject.asObservable();

  constructor() {}

  getSearchText(): string {
    return this.searchTextSubject.value;
  }

  setSearchText(text: string): void {
    this.searchTextSubject.next(text);
  }

  getFilterOptions(): Observable<string[]> {
    return this.selectedFilter$;
  }

  setSelectedFilter(filters: string[]) {
    this.selectedFilterSubject.next(filters);
  }

  resetFilterOptionsToInitial() {
    this.selectedFilterSubject.next([]);
  }
}
