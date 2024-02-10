import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-highlighting-dialog',
  templateUrl: './highlighting-dialog.component.html',
  styleUrls: ['./highlighting-dialog.component.scss'],
})
export class HighlightingDialogComponent {
  @Input() visible!: boolean;
  @Output() dialogChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  debugColor: string = '#155724';
  infoColor: string = '#FFFFF6';
  warningColor: string = '#E6C700';
  errorColor: string = '#FF031A';

  closeDialog() {
    this.visible = false;
    this.dialogChanged.emit(this.visible);
  }
}
