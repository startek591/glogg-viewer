import { Injectable } from '@angular/core';
import { FileModel } from '../../models/file.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FileService {
  private files: BehaviorSubject<FileModel[]> = new BehaviorSubject<
    FileModel[]
  >([]);
  private addedFileSubject: BehaviorSubject<FileModel | null> =
    new BehaviorSubject<FileModel | null>(null);

  file!: FileModel;
  fileIdCounter: number = 1;

  constructor() {}

  getFiles(): Observable<FileModel[]> {
    return this.files.asObservable();
  }

  addFile(file: FileModel) {
    const currentFiles = this.files.value;
    currentFiles.push(file);
    this.updateFiles(currentFiles);
    this.addedFileSubject.next(file);
  }

  updateFiles(newFiles: FileModel[]) {
    this.files.next(newFiles);
  }

  deleteFile(file: FileModel) {
    const currentFiles = this.files.value;
    const index = currentFiles.indexOf(file);

    if (index !== -1) {
      currentFiles.splice(index, 1);
      this.updateFiles(currentFiles);
    }
  }

  readFile(file: File): Observable<string> {
    const fileObservable: Observable<string> = new Observable<string>(
      (observer) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const fileContent = e.target.result;

          const fileModel: FileModel = {
            id: this.fileIdCounter++,
            name: this.modifiedName(file.name),
            content: fileContent,
            size: this.calculateFileSize(file.size),
          };

          this.addFile(fileModel);
          this.file = fileModel;
          observer.next(fileContent);
          observer.complete();
        };

        reader.onerror = (error) => {
          observer.error(error);
        };

        reader.readAsText(file);

        return () => {
          reader.abort();
        };
      }
    );

    return fileObservable;
  }

  modifiedName(fileName: string) {
    const firstLetter = fileName[0].toUpperCase();
    const lastPart = fileName.slice(1);
    const modifiedName = firstLetter + lastPart;
    return modifiedName;
  }

  calculateFileSize(fileSizeInBytes: number): string {
    if (fileSizeInBytes === 0 || null) {
      return 0 + ' B';
    } else if (fileSizeInBytes < 1024 * 1024) {
      return (fileSizeInBytes / 1024).toFixed(2) + ' KB';
    } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
      return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }
}
