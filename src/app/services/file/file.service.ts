import { Injectable } from '@angular/core';
import { FileModel } from '../../models/file.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private files: BehaviorSubject<FileModel[]> = new BehaviorSubject<FileModel[]>([]);
  private addedFileSubject: BehaviorSubject<FileModel | null> = new BehaviorSubject<FileModel | null>(null);

  file!: FileModel;
  fildIdCounter: number = 1;

  constructor() { }

  getFiles(): Observable<FileModel[]> {
    return this.files.asObservable();
  }
}
