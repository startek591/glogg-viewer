import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

const modules = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  DividerModule,
  ToastModule,
  DialogModule,
  ColorPickerModule,
  FormsModule,
  InputTextModule,
  InputTextareaModule,
  PanelModule,
  TabViewModule,
  ScrollPanelModule,
  TooltipModule,
  TableModule,
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [MessageService],
})
export class SharedModule {}
