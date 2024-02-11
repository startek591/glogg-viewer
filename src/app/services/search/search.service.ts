import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');

  searchText$ = this.searchTextSubject.asObservable();

  constructor() {}

  getSearchText(): string {
    return this.searchTextSubject.value;
  }

  setSearchText(text: string): void {
    this.searchTextSubject.next(text);
  }
}
