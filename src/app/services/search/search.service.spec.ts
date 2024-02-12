import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get initial search text', () => {
    const initialSearchText = service.getSearchText();
    expect(initialSearchText).toEqual('');
  });

  it('should set search text', () => {
    const newText = 'New Search Text';
    service.setSearchText(newText);
    const updatedSearchText = service.getSearchText();
    expect(updatedSearchText).toEqual(newText);
  });

  it('should get initial filter options', () => {
    const initialFilterOptions: string[] = [];
    service.getFilterOptions().subscribe((options) => {
      expect(options).toEqual(initialFilterOptions);
    });
  });

  it('should set filter options', () => {
    const newFilterOptions: string[] = ['Option1', 'Option2'];
    service.setSelectedFilter(newFilterOptions);
    service.getFilterOptions().subscribe((options) => {
      expect(options).toEqual(newFilterOptions);
    });
  });

  it('should reset filter options to initial state', () => {
    const newFilterOptions: string[] = ['Option1', 'Option2'];
    service.setSelectedFilter(newFilterOptions);
    service.resetFilterOptionsToInitial();
    service.getFilterOptions().subscribe((options) => {
      expect(options).toEqual([]);
    });
  });
});
