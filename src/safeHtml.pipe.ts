import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  
    constructor(public sanitized: DomSanitizer) {}

    transform(value)  {
        console.log(this.sanitized.bypassSecurityTrustHtml(value))
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}