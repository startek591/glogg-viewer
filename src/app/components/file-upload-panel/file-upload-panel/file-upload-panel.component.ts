import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file/file.service';
@Component({
  selector: 'app-file-upload-panel',
  templateUrl: './file-upload-panel.component.html',
  styleUrls: ['./file-upload-panel.component.scss'],
})
export class FileUploadPanelComponent implements OnChanges {
  @Input() fileList: FileModel[] = [];
  @Input() activeIndex: number = 0;
  fileContent: string | null = null;

  constructor(private fileService: FileService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fileList']) {
      if (this.fileList !== null) {
        this.fileList;
      }
    }
  }

  @HostListener('document:dragover', ['$event'])
  @HostListener('drop', ['$event'])
  onDragDropFileVerifyZone(event: any) {
    event.preventDefault();
    const element = event.target as HTMLElement;
    if (
      element.matches('div.drop-zone') ||
      element.matches('span.drop-zone') ||
      element.matches('i.drop-zone')
    ) {
      const droppedFiles = event.dataTransfer?.files[0];
      const fileType = event.dataTransfer?.files[0]?.type;
      if (droppedFiles && fileType === 'text/plain') {
        this.fileService.readFile(droppedFiles).subscribe((content: string) => {
          this.fileContent = content;
        });
      }
    } else {
      event.dataTransfer.effectAllowed = 'none';
      event.dataTransfer.dropEffect = 'none';
    }
  }
}
