import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightingDialogComponent } from './highlighting-dialog.component';
import { SharedModule } from '../../shared/shared.module';

describe('HighlightingDialogComponent', () => {
  let component: HighlightingDialogComponent;
  let fixture: ComponentFixture<HighlightingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightingDialogComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(HighlightingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the Highlighting Panel when ok button is clicked', () => {
    spyOn(component.dialogChanged, 'emit');
    component.closeDialog();
    expect(component.dialogChanged.emit).toHaveBeenCalledWith(false);
  });
});
