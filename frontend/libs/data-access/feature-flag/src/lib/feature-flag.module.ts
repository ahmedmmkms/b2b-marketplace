import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FfIfDirective } from './lib/ff-if.directive';

@NgModule({
  declarations: [
    FfIfDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FfIfDirective
  ]
})
export class FeatureFlagModule { }