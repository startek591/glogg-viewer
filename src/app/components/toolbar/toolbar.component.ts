import { Component, ViewChild, ElementRef } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  files: FileModel[] = [];
  fileContent!: string;
  fileSize!: string;
  searchTest!: string;
  isDisabled: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fileService: FileService) {}

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
}
