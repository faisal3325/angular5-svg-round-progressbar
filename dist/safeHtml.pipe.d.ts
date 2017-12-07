import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export declare class SafeHtmlPipe implements PipeTransform {
    sanitized: DomSanitizer;
    constructor(sanitized: DomSanitizer);
    transform(value: any): SafeHtml;
}
