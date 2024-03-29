import { TestBed } from '@angular/core/testing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HighlightingDialogComponent } from './components/highlighting-dialog/highlighting-dialog.component';
import { FileUploadPanelComponent } from './components/file-upload-panel/file-upload-panel.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent,
        HighlightingDialogComponent,
        FileUploadPanelComponent,
      ],
      imports: [SharedModule],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'glogg-viewer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('glogg-viewer');
  });
});
