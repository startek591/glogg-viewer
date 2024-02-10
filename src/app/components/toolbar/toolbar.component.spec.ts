import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { HighlightingDialogComponent } from '../highlighting-dialog/highlighting-dialog.component';
import { FileUploadPanelComponent } from '../file-upload-panel/file-upload-panel/file-upload-panel.component';
import { FileService } from 'src/app/services/file/file.service';
import { By } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let fileService: FileService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        HighlightingDialogComponent,
        FileUploadPanelComponent,
      ],
      imports: [SharedModule],
      providers: [FileService, MessageService],
    });
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fileService = TestBed.inject(FileService);
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file button click', () => {
    const fileInput = fixture.debugElement.query(
      By.css('input[type="file"]')
    ).nativeElement;

    spyOn(fileInput, 'click');

    component.handleFileButtonClick();

    expect(fileInput.click).toHaveBeenCalled();
    expect(fileInput.value).toBe('');
  });

  it('should handle file selection and reading', fakeAsync(() => {
    const mockFile = new File(['Content 3'], 'File3.txt', {
      type: 'text/plain',
    });
    const mockContent = 'Content 3';

    const fileServiceSpy = spyOn(fileService, 'readFile').and.returnValue(
      of(mockContent)
    );

    const inputElement = document.createElement('input');
    inputElement.type = 'file';

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(mockFile);

    inputElement.files = dataTransfer.files;

    const event = { target: inputElement };

    component.onFileSelected(event);

    tick();

    expect(fileServiceSpy).toHaveBeenCalled();
    expect(component.fileContent).toEqual(mockContent);
  }));

  it('should display an error toast for non-plain text file', fakeAsync(() => {
    const nonPlainTextFile = new File(['file content'], 'file.png', {
      type: 'image/png',
    });
    const event = {
      target: {
        files: [nonPlainTextFile],
      },
    } as any;

    const messageServiceSpy = spyOn(messageService, 'add');

    component.onFileSelected(event);

    tick();

    expect(messageServiceSpy).toHaveBeenCalled();
    expect(messageServiceSpy).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'File Type Error',
      detail: 'Selected file is not compatible',
    });
  }));

  it('should display highlighting dialog panel', () => {
    expect(component.visible).toBeFalsy();
    component.showDialog();
    expect(component.visible).toBeTruthy();
  });

  it('should close dialog highlighting dialog panel', () => {
    component.visible = true;
    component.closeDialog(false);
    expect(component.visible).toBe(false);
  });
});
