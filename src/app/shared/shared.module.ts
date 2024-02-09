import { NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

const modules = [
    CardModule, 
    ToolbarModule
];

@NgModule({
    declarations: [],
    imports: [
        ...modules
    ],
    exports: [
        ...modules,
    ]
})
export class SharedModule {}