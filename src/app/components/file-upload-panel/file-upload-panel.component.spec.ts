import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FileService } from '../../services/file/file.service';
import { FileUploadPanelComponent } from './file-upload-panel.component';
import { of } from 'rxjs';

describe('FileUploadPanelComponent', () => {
  let component: FileUploadPanelComponent;
  let fixture: ComponentFixture<FileUploadPanelComponent>;
  let fileService: jasmine.SpyObj<FileService>;

  beforeEach(() => {
    fileService = jasmine.createSpyObj('FileService', [
      'deleteFile',
      'readFile',
    ]);
    TestBed.configureTestingModule({
      declarations: [FileUploadPanelComponent],
      providers: [{ provide: FileService, useValue: fileService }],
    });
    fixture = TestBed.createComponent(FileUploadPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read file and set fileContent on drag and drop', fakeAsync(() => {
    const event: any = {
      preventDefault: jasmine.createSpy(),
      target: { matches: jasmine.createSpy().and.returnValue(true) },
      dataTransfer: { files: [{ type: 'text/plain' }] },
    };

    tick();

    fileService.readFile.and.returnValue(of('File Content'));

    component.onDragDropFileVerifyZone(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.target.matches).toHaveBeenCalledWith('div.drop-zone');
    expect(component.fileContent).toEqual('File Content');
  }));

  it('should not read file on drag and drop when the file type is not text/plain', () => {
    const event = {
      preventDefault: jasmine.createSpy(),
      target: { matches: jasmine.createSpy().and.returnValue(false) },
      dataTransfer: { files: [{ type: 'text/plain' }] },
    };
    fileService.readFile.and.returnValue(of(''));

    component.onDragDropFileVerifyZone(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.target.matches).toHaveBeenCalledWith('div.drop-zone');
    expect(component.fileContent).toBeNull();
  });

  it('should add a new tab', () => {
    component.fileList = [{ title: 'File 1', content: 'Content 1' }];
    component.activeIndex = 1;

    component.addTab();

    expect(component.fileList.length).toEqual(2);
    expect(component.fileList[1]).toEqual({ title: '', content: '' });
  });
});
