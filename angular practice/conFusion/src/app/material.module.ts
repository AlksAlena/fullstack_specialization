import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule
} from '@angular/material';

const MAT_MODULES  = [
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})
export class MaterialModule { }