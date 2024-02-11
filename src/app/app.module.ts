import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HighlightingDialogComponent } from './components/highlighting-dialog/highlighting-dialog.component';
import { FileUploadPanelComponent } from './components/file-upload-panel/file-upload-panel.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HighlightingDialogComponent,
    FileUploadPanelComponent,
    CustomTableComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
