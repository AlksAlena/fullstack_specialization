import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatListModule,
  MatCardModule
} from '@angular/material';

const MAT_MODULES  = [
  MatToolbarModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatListModule,
  MatCardModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})
export class MaterialModule { }