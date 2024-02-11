import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { TableService } from '../../services/table/table.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() data!: string;
  container: string[] = [];
  fileData: string[] = [];
  searchTerm: string = '';
  searchResults: string = '';
  selectedFilters: string[] = [];

  selectedFile!: FileModel;
  metaKeySelection: boolean = true;

  targetWords: { word: string; textColor: string; backgroundColor: string }[] =
    [
      { word: 'DEBUG', textColor: '#155724', backgroundColor: '#D4EDDAE6' },
      { word: 'INFO', textColor: '#000000', backgroundColor: '#FFFFF6' },
      { word: 'WARNING', textColor: '#856404', backgroundColor: '#E6C700' },
      { word: 'ERROR', textColor: '#721C24', backgroundColor: '#FF5252E6' },
    ];

  constructor(private tableServe: TableService) {}

  ngOnInit(): void {
    this.loadData(this.data);
  }

  loadData(content: any) {
    this.fileData = this.tableServe.parsingData(content);
    return this.fileData;
  }

  getStyleForTextItem(textItem: string): { [key: string]: string } {
    const defaultColor = 'white';
    const styles: { [key: string]: string } = {
      'background-color': defaultColor,
    };

    for (const target of this.targetWords) {
      if (textItem.includes(target.word)) {
        styles['color'] = target.textColor;
        styles['background-color'] = target.backgroundColor;
        styles['border-radius'] = '6px';
        break;
      }
    }

    return styles;
  }
}
