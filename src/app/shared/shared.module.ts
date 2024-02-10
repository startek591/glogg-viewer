import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';

const modules = [CardModule, ToolbarModule, ButtonModule, DividerModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [MessageService],
})
export class SharedModule {}
