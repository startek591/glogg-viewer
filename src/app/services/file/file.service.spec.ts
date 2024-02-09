import { TestBed } from '@angular/core/testing';
import { FileModel } from 'src/app/models/file.model';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have be initialize with no files', () => {
      service.getFiles().subscribe((files) => {
        expect(files.length).toBe(0);
      });
  });
});

