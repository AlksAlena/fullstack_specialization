import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatSliderModule
} from '@angular/material';

const MAT_MODULES  = [
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatSliderModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})
export class MaterialModule { }