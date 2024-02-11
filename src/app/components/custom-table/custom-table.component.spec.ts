import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableService } from '../../services/table/table.service';
import { CustomTableComponent } from './custom-table.component';
import { SharedModule } from '../../shared/shared.module';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;
  let tableService: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTableComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tableService = TestBed.inject(TableService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call loadData with data on ngOnInit', () => {
    const data = 'test data';
    const mockReturnValue = ['mockedData1', 'mockedData2'];
    spyOn(tableService, 'parsingData').and.returnValue(mockReturnValue);

    component.data = data;
    component.ngOnInit();

    expect(tableService.parsingData).toHaveBeenCalledWith(data);
    expect(component.fileData).toEqual(mockReturnValue);
  });
});
