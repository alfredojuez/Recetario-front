import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetaPreviewComponent } from './receta-preview.component';



@NgModule({
  declarations: [RecetaPreviewComponent],
  imports: [
    CommonModule
  ],
  exports: [RecetaPreviewComponent]
})

export class RecetaPreviewModule { }
