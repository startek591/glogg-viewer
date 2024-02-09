import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { FileService } from 'src/app/services/file/file.service';
import { By } from '@angular/platform-browser';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let fileService: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [SharedModule],
      providers: [FileService],
    });
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fileService = TestBed.inject(FileService);
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
});
