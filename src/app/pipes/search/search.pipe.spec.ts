import { SearchService } from 'src/app/services/search/search.service';
import { SearchPipe } from './search.pipe';
import { TestBed } from '@angular/core/testing';

describe('SearchPipe', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
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
