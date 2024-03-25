import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  isLargeScreen = window.innerWidth >= 540;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  filterOptions: { label: string; value: string }[] = [];

  selectedFilters: string[] = this.filterOptions.map((option) => option.value);
  currentfilterOptions: string[] = [];

  constructor(
    private fileService: FileService,
    private messageService: MessageService,
    private searchService: SearchService
  ) {
    this.filterOptions = [
      { label: 'INFO', value: 'INFO' },
      { label: 'DEBUG', value: 'DEBUG' },
      { label: 'ERROR', value: 'ERROR' },
      { label: 'WARNING', value: 'WARNING' },
    ];

    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadData();
    this.loadFilterOptions();
  }

  loadData(): void {
    this.fileService.getFiles().subscribe((file) => {
      return (this.files = file);
    });
  }

  loadFilterOptions(): void {
    this.searchService.getFilterOptions().subscribe((filters) => {
      this.selectedFilters = filters;
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

  setSelectedFilter(event: any) {
    if (this.shouldBeDisabled()) {
      return true;
    } else {
      this.selectedFilters = event;
      this.searchService.setSelectedFilter(this.selectedFilters);
      return false;
    }
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 540;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
}
