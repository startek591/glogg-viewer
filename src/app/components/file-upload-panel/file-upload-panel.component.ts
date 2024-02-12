import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { FileService } from '../../services/file/file.service';
import { SearchService } from '../../services/search/search.service';
@Component({
  selector: 'app-file-upload-panel',
  templateUrl: './file-upload-panel.component.html',
  styleUrls: ['./file-upload-panel.component.scss'],
})
export class FileUploadPanelComponent implements OnChanges {
  @Input() fileList: any[] = [];
  @Input() activeIndex!: number;
  fileContent: string | null = null;
  @Output() tabChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() tabsChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(
    private fileService: FileService,
    private searchService: SearchService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fileList']) {
      if (this.fileList !== null) {
        this.fileList;
      }
    }
  }

  onTabChange(event: any) {
    this.activeIndex = event;
    this.fileList[this.activeIndex];
  }

  onClose(event: any) {
    const closedTabIndex = this.fileList[event.index];
    this.fileService.deleteFile(closedTabIndex);
    this.fileList.length === 0
      ? this.searchService.resetFilterOptionsToInitial()
      : null;
  }

  @HostListener('document:dragover', ['$event'])
  @HostListener('drop', ['$event'])
  onDragDropFileVerifyZone(event: any) {
    event.preventDefault();
    const element = event.target as HTMLElement;
    const droppedText = event.dataTransfer?.getData
      ? event.dataTransfer.getData('text')
      : null;
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

    if (droppedText) {
      const blob = new Blob([droppedText], { type: 'text/plain' });

      const file = new File([blob], 'dropped_text.txt', { type: 'text/plain' });

      this.fileService.readFile(file).subscribe((content: string) => {
        this.fileContent = content;
      });
    }
  }

  addTab(): void {
    if (this.activeIndex === this.fileList.length) {
      this.fileList.push({ title: '', content: '' });
    }
  }
}
