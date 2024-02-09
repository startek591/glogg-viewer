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

  it('should add a file', (done) => {
    const fileModel = new FileModel(1, 'Test.txt', 'File content', '10 KB');
    service.addFile(fileModel);

    service.getFiles().subscribe((files) => {
      expect(files).toContain(fileModel);
      done();
    });
  });
});

