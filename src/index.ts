import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT, DomSanitizer, BrowserModule } from '@angular/platform-browser';

import { RoundProgressComponent } from './round-progress.component';
import { SafeHtmlPipe } from './safeHtml.pipe';
import { RoundProgressService } from './round-progress.service';
import { RoundProgressEase } from './round-progress.ease';
import { RoundProgressConfig } from './round-progress.config';

export * from './round-progress.component';
export * from './safeHtml.pipe';
export * from './round-progress.service';
export * from './round-progress.ease';
export * from './round-progress.config';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    RoundProgressComponent,
    SafeHtmlPipe
  ],
  exports: [
    RoundProgressComponent
  ],
  providers: [
    RoundProgressService, 
    RoundProgressEase, 
    RoundProgressConfig
  ]
})
export class RoundProgressModule {}
