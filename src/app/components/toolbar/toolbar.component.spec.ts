import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { HighlightingDialogComponent } from '../highlighting-dialog/highlighting-dialog.component';
import { FileUploadPanelComponent } from '../file-upload-panel/file-upload-panel.component';
import { FileService } from '../../services/file/file.service';
import { By } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { SearchService } from '../../services/search/search.service';
import { FileModel } from '../../models/file.model';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let fileService: FileService;
  let messageService: MessageService;
  let searchService: SearchService;

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
    searchService = TestBed.inject(SearchService);
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

  it('should set search text when not disabled', () => {
    component.files = [
      new FileModel(1, 'file1', 'Test 1', '10KB'),
      new FileModel(2, 'file2', 'Test 2', '1 GB'),
    ];
    component.searchText = 'test';

    spyOn(searchService, 'setSearchText');

    component.onSearchText();

    expect(searchService.setSearchText).toHaveBeenCalledWith('test');
  });

  it('should set search text to empty when disabled', () => {
    component.files = [];
    component.searchText = 'test';

    spyOn(searchService, 'setSearchText');

    component.onSearchText();

    expect(searchService.setSearchText).toHaveBeenCalledWith('');
    expect(component.searchText).toBe('');
  });

  it('shouldBeDisabled should return true when files array is empty', () => {
    component.files = [];

    expect(component.shouldBeDisabled()).toBeTrue();
    expect(component.searchText).toBe('');
  });

  it('shouldBeDisabled should return false when files array is not empty', () => {
    component.files = [
      new FileModel(1, 'file1', 'Test 1', '10KB'),
      new FileModel(2, 'file2', 'Test 2', '1 GB'),
    ];

    expect(component.shouldBeDisabled()).toBeFalse();
  });
});
