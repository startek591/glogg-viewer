import { Component, ViewChild, ElementRef } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file/file.service';
import { MessageService } from 'primeng/api';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  files: FileModel[] = [];
  activeIndex: number = 0;
  visible: boolean = false;
  fileContent!: string;
  fileSize!: string;
  searchText!: string;
  isDisabled: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fileService: FileService,
    private messageService: MessageService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.fileService.getFiles().subscribe((file) => {
      return (this.files = file);
    });
  }

  handleFileButtonClick() {
    this.fileInput.nativeElement.click();
    this.fileInput.nativeElement.value = '';
  }

  onFileSelected(event: any) {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      if (selectedFile.type !== 'text/plain') {
        this.messageService.add({
          severity: 'error',
          summary: 'File Type Error',
          detail: `Selected file is not compatible`,
        });
      } else {
        this.fileService.readFile(selectedFile).subscribe((content: string) => {
          this.fileContent = content;
        });
      }
    }
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog(event: any) {
    this.visible = event;
  }

  onSearchText() {
    if (this.shouldBeDisabled()) {
      this.searchService.setSearchText(this.searchText);
    } else {
      this.searchService.setSearchText(this.searchText);
    }
  }

  shouldBeDisabled(): boolean {
    if (this.files.length !== 0) {
      return false;
    } else {
      this.searchText = '';
      this.searchService.setSearchText(this.searchText);
      return true;
    }
  }
}
