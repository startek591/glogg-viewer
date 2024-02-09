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

  it('should delete a file', () => {
    const fileModel = new FileModel(1, 'Test.txt', 'File content', '10 KB');
    service.addFile(fileModel);

    service.deleteFile(fileModel);
    service.getFiles().subscribe((files) => {
      expect(files).not.toContain(fileModel);
    });
  });

  it('should update files', (done) => {
    const fileModel1 = new FileModel(1, 'Test1.txt', 'File content 1', '5 KB');
    const fileModel2 = new FileModel(2, 'Test2.text', 'File content 2', '8 KB');
    service.updateFiles([fileModel1, fileModel2]);

    service.getFiles().subscribe((files) => {
      expect(files.length).toBe(2);
      expect(files).toContain(fileModel1);
      expect(files).toContain(fileModel2);
      done();
    });
  });
});

