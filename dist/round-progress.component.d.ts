import { OnChanges, NgZone, EventEmitter, Renderer } from '@angular/core';
import { RoundProgressService } from './round-progress.service';
import { RoundProgressConfig } from './round-progress.config';
import { RoundProgressEase } from './round-progress.ease';
import { DomSanitizer } from '@angular/platform-browser';
export declare class RoundProgressComponent implements OnChanges {
    private _service;
    private _easing;
    private _defaults;
    private _ngZone;
    private _renderer;
    sanitizer: DomSanitizer;
    private _lastAnimationId;
    elementHeight: any;
    paddingBottom: any;
    viewBoxAt: any;
    diameter: any;
    resColor: any;
    pathTransform: any;
    constructor(_service: RoundProgressService, _easing: RoundProgressEase, _defaults: RoundProgressConfig, _ngZone: NgZone, _renderer: Renderer, sanitizer: DomSanitizer);
    /** Animates a change in the current value. */
    private _animateChange(from, to);
    /** Sets the path dimensions. */
    private _setPath(value);
    /** Clamps a value between the maximum and 0. */
    private _clamp(value);
    /** Determines the SVG transforms for the <path> node. */
    getPathTransform(): string;
    /** Resolves a color through the service. */
    resolveColor(color: string): string;
    /** Change detection callback. */
    ngOnChanges(changes: any): void;
    /** Diameter of the circle. */
    _diameter(): number;
    /** The CSS height of the wrapper element. */
    _elementHeight(): string;
    /** Viewbox for the SVG element. */
    _viewBox(): string;
    /** Bottom padding for the wrapper element. */
    _paddingBottom(): string;
    _path: any;
    current: number;
    max: number;
    radius: number;
    animation: string;
    animationDelay: number;
    duration: number;
    stroke: number;
    color: string;
    background: string;
    responsive: boolean;
    clockwise: boolean;
    semicircle: boolean;
    rounded: boolean;
    onRender: EventEmitter<number>;
}
