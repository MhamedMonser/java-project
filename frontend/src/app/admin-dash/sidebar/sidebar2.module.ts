import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar2Component } from './sidebar2.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ Sidebar2Component ],
    exports: [ Sidebar2Component ]
})

export class Sidebar2Module {}
