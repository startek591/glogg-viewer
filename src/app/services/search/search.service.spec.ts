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
});
