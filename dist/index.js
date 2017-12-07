import { Component, EventEmitter, Inject, Injectable, Input, NgModule, NgZone, Optional, Output, Pipe, Renderer, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, DOCUMENT, DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DEGREE_IN_RADIANS = Math.PI / 180;
var RoundProgressService = (function () {
    function RoundProgressService(document) {
        this.supportsSvg = !!(document && document.createElementNS
            && document.createElementNS('https://www.w3.org/2000/svg', 'svg').createSVGRect);
        this._base = document && document.head.querySelector('base');
        this._hasPerf = typeof window !== 'undefined' && window.performance && window.performance.now &&
            typeof window.performance.now() === 'number';
    }
    /**
     * Resolves a SVG color against the page's `base` tag.
     */
    /**
     * Resolves a SVG color against the page's `base` tag.
     * @param {?} color
     * @return {?}
     */
    RoundProgressService.prototype.resolveColor = /**
     * Resolves a SVG color against the page's `base` tag.
     * @param {?} color
     * @return {?}
     */
    function (color) {
        if (this._base && this._base.href) {
            var /** @type {?} */ hashIndex = color.indexOf('#');
            if (hashIndex > -1 && color.indexOf('url') > -1) {
                return color.slice(0, hashIndex) + location.href + color.slice(hashIndex);
            }
        }
        return color;
    };
    /**
     * Generates a timestamp.
     */
    /**
     * Generates a timestamp.
     * @return {?}
     */
    RoundProgressService.prototype.getTimestamp = /**
     * Generates a timestamp.
     * @return {?}
     */
    function () {
        return this._hasPerf ? window.performance.now() : Date.now();
    };
    /**
     * Generates the value for an SVG arc.
     * @param current       Current value.
     * @param total         Maximum value.
     * @param pathRadius    Radius of the SVG path.
     * @param elementRadius Radius of the SVG container.
     * @param isSemicircle  Whether the element should be a semicircle.
     */
    /**
     * Generates the value for an SVG arc.
     * @param {?} current       Current value.
     * @param {?} total         Maximum value.
     * @param {?} pathRadius    Radius of the SVG path.
     * @param {?} elementRadius Radius of the SVG container.
     * @param {?=} isSemicircle  Whether the element should be a semicircle.
     * @return {?}
     */
    RoundProgressService.prototype.getArc = /**
     * Generates the value for an SVG arc.
     * @param {?} current       Current value.
     * @param {?} total         Maximum value.
     * @param {?} pathRadius    Radius of the SVG path.
     * @param {?} elementRadius Radius of the SVG container.
     * @param {?=} isSemicircle  Whether the element should be a semicircle.
     * @return {?}
     */
    function (current, total, pathRadius, elementRadius, isSemicircle) {
        if (isSemicircle === void 0) { isSemicircle = false; }
        var /** @type {?} */ value = Math.max(0, Math.min(current || 0, total));
        var /** @type {?} */ maxAngle = isSemicircle ? 180 : 359.9999;
        var /** @type {?} */ percentage = total === 0 ? maxAngle : (value / total) * maxAngle;
        var /** @type {?} */ start = this._polarToCartesian(elementRadius, pathRadius, percentage);
        var /** @type {?} */ end = this._polarToCartesian(elementRadius, pathRadius, 0);
        var /** @type {?} */ arcSweep = (percentage <= 180 ? 0 : 1);
        return "M " + start + " A " + pathRadius + " " + pathRadius + " 0 " + arcSweep + " 0 " + end;
    };
    
    /**
     * Converts polar cooradinates to Cartesian.
     * @param {?} elementRadius  Radius of the wrapper element.
     * @param {?} pathRadius     Radius of the path being described.
     * @param {?} angleInDegrees Degree to be converted.
     * @return {?}
     */
    RoundProgressService.prototype._polarToCartesian = /**
     * Converts polar cooradinates to Cartesian.
     * @param {?} elementRadius  Radius of the wrapper element.
     * @param {?} pathRadius     Radius of the path being described.
     * @param {?} angleInDegrees Degree to be converted.
     * @return {?}
     */
    function (elementRadius, pathRadius, angleInDegrees) {
        var /** @type {?} */ angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
        var /** @type {?} */ x = elementRadius + (pathRadius * Math.cos(angleInRadians));
        var /** @type {?} */ y = elementRadius + (pathRadius * Math.sin(angleInRadians));
        return x + ' ' + y;
    };
    RoundProgressService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RoundProgressService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return RoundProgressService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var RoundProgressConfig = (function () {
    function RoundProgressConfig() {
        this._options = {
            radius: 125,
            animation: 'easeOutCubic',
            animationDelay: null,
            duration: 500,
            stroke: 15,
            color: '#45CCCE',
            background: '#EAEAEA',
            responsive: false,
            clockwise: true,
            semicircle: false,
            rounded: false
        };
    }
    /** Configures the defaults. */
    /**
     * Configures the defaults.
     * @param {?} config
     * @return {?}
     */
    RoundProgressConfig.prototype.setDefaults = /**
     * Configures the defaults.
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return (/** @type {?} */ (Object)).assign(this._options, config);
    };
    /** Fetches a value from the defaults. */
    /**
     * Fetches a value from the defaults.
     * @param {?} key
     * @return {?}
     */
    RoundProgressConfig.prototype.get = /**
     * Fetches a value from the defaults.
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._options[key];
    };
    RoundProgressConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RoundProgressConfig.ctorParameters = function () { return []; };
    return RoundProgressConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RoundProgressEase = (function () {
    function RoundProgressEase() {
    }
    // t: current time (or position) of the neonate. This can be seconds or frames, steps,
    // seconds, ms, whatever – as long as the unit is the same as is used for the total time.
    // b: beginning value of the property.
    // c: change between the beginning and destination value of the property.
    // d: total time of the neonate.
    /**
     * @param {?} param
     * @return {?}
     */
    RoundProgressEase.prototype.getAnimateValue = /**
     * @param {?} param
     * @return {?}
     */
    function (param) {
        switch (param.name) {
            case 'linearEase':
                return this.linearEase(param.t, param.b, param.c, param.d);
            case 'easeInQuad':
                return this.easeInQuad(param.t, param.b, param.c, param.d);
            case 'easeOutQuad':
                return this.easeOutQuad(param.t, param.b, param.c, param.d);
            case 'easeInOutQuad':
                return this.easeInOutQuad(param.t, param.b, param.c, param.d);
            case 'easeInCubic':
                return this.easeInCubic(param.t, param.b, param.c, param.d);
            case 'easeOutCubic':
                return this.easeOutCubic(param.t, param.b, param.c, param.d);
            case 'easeInOutCubic':
                return this.easeInOutCubic(param.t, param.b, param.c, param.d);
            case 'easeInQuart':
                return this.easeInQuart(param.t, param.b, param.c, param.d);
            case 'easeOutQuart':
                return this.easeOutQuart(param.t, param.b, param.c, param.d);
            case 'easeInOutQuart':
                return this.easeInOutQuart(param.t, param.b, param.c, param.d);
            case 'easeInQuint':
                return this.easeInQuint(param.t, param.b, param.c, param.d);
            case 'easeOutQuint':
                return this.easeOutQuint(param.t, param.b, param.c, param.d);
            case 'easeInOutQuint':
                return this.easeInOutQuint(param.t, param.b, param.c, param.d);
            case 'easeInSine':
                return this.easeInSine(param.t, param.b, param.c, param.d);
            case 'easeOutSine':
                return this.easeOutSine(param.t, param.b, param.c, param.d);
            case 'easeInOutSine':
                return this.easeInOutSine(param.t, param.b, param.c, param.d);
            case 'easeInExpo':
                return this.easeInExpo(param.t, param.b, param.c, param.d);
            case 'easeOutExpo':
                return this.easeOutExpo(param.t, param.b, param.c, param.d);
            case 'easeInOutExpo':
                return this.easeInOutExpo(param.t, param.b, param.c, param.d);
            case 'easeInCirc':
                return this.easeInCirc(param.t, param.b, param.c, param.d);
            case 'easeOutCirc':
                return this.easeOutCirc(param.t, param.b, param.c, param.d);
            case 'easeInOutCirc':
                return this.easeInOutCirc(param.t, param.b, param.c, param.d);
            case 'easeInElastic':
                return this.easeInElastic(param.t, param.b, param.c, param.d);
            case 'easeOutElastic':
                return this.easeOutElastic(param.t, param.b, param.c, param.d);
            case 'easeInOutElastic':
                return this.easeInOutElastic(param.t, param.b, param.c, param.d);
            case 'easeInBack':
                return this.easeInBack(param.t, param.b, param.c, param.d);
            case 'easeOutBack':
                return this.easeOutBack(param.t, param.b, param.c, param.d);
            case 'easeInOutBack':
                return this.easeInOutBack(param.t, param.b, param.c, param.d);
            case 'easeInBounce':
                return this.easeInBounce(param.t, param.b, param.c, param.d);
            case 'easeOutBounce':
                return this.easeOutBounce(param.t, param.b, param.c, param.d);
            case 'easeInOutBounce':
                return this.easeInOutBounce(param.t, param.b, param.c, param.d);
        }
    };
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.linearEase = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * t / d + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInQuad = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutQuad = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutQuad = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInCubic = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutCubic = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutCubic = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInQuart = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutQuart = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutQuart = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInQuint = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutQuint = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutQuint = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInSine = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutSine = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutSine = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInExpo = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutExpo = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutExpo = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if (t == 0) {
            return b;
        }
        
        if (t == d) {
            return b + c;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInCirc = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutCirc = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutCirc = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInElastic = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        var /** @type {?} */ s = 1.70158;
        var /** @type {?} */ p = d * 0.3;
        var /** @type {?} */ a = c;
        if (t == 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t--)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutElastic = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        var /** @type {?} */ s = 1.70158;
        var /** @type {?} */ p = d * 0.3;
        var /** @type {?} */ a = c;
        if (t == 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutElastic = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        var /** @type {?} */ s = 1.70158;
        var /** @type {?} */ p = d * (0.3 * 1.5);
        var /** @type {?} */ a = c;
        if (t == 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @param {?=} s
     * @return {?}
     */
    RoundProgressEase.prototype.easeInBack = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @param {?=} s
     * @return {?}
     */
    function (t, b, c, d, s) {
        if (s === void 0) { s = 1.70158; }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @param {?=} s
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutBack = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @param {?=} s
     * @return {?}
     */
    function (t, b, c, d, s) {
        if (s === void 0) { s = 1.70158; }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @param {?=} s
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutBack = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @param {?=} s
     * @return {?}
     */
    function (t, b, c, d, s) {
        if (s === void 0) { s = 1.70158; }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInBounce = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        return c - this.easeOutBounce(d - t, 0, c, d) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeOutBounce = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    };
    
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    RoundProgressEase.prototype.easeInOutBounce = /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        if (t < d / 2) {
            return this.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
        }
        return this.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    };
    
    RoundProgressEase.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RoundProgressEase.ctorParameters = function () { return []; };
    return RoundProgressEase;
}());

/**
 * TERMS OF USE - EASING EQUATIONS
 * Open source under the BSD License.

 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions
 * and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions
 * and the following disclaimer in the documentation and/or other materials provided with the
 * distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse or promote
 * products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RoundProgressComponent = (function () {
    function RoundProgressComponent(_service, _easing, _defaults, _ngZone, _renderer, sanitizer) {
        this._service = _service;
        this._easing = _easing;
        this._defaults = _defaults;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this.sanitizer = sanitizer;
        this._lastAnimationId = 0;
        this.radius = this._defaults.get('radius');
        this.animation = this._defaults.get('animation');
        this.animationDelay = this._defaults.get('animationDelay');
        this.duration = this._defaults.get('duration');
        this.stroke = this._defaults.get('stroke');
        this.color = this._defaults.get('color');
        this.background = this._defaults.get('background');
        this.responsive = this._defaults.get('responsive');
        this.clockwise = this._defaults.get('clockwise');
        this.semicircle = this._defaults.get('semicircle');
        this.rounded = this._defaults.get('rounded');
        this.onRender = new EventEmitter();
    }
    /**
     * Animates a change in the current value.
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    RoundProgressComponent.prototype._animateChange = /**
     * Animates a change in the current value.
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    function (from, to) {
        var _this = this;
        if (typeof from !== 'number') {
            from = 0;
        }
        to = this._clamp(to);
        from = this._clamp(from);
        var /** @type {?} */ self = this;
        var /** @type {?} */ changeInValue = to - from;
        var /** @type {?} */ duration = self.duration;
        // Avoid firing change detection for each of the animation frames.
        self._ngZone.runOutsideAngular(function () {
            var /** @type {?} */ start = function () {
                var /** @type {?} */ startTime = self._service.getTimestamp();
                var /** @type {?} */ id = ++self._lastAnimationId;
                requestAnimationFrame(function animation() {
                    var /** @type {?} */ currentTime = Math.min(self._service.getTimestamp() - startTime, duration);
                    var /** @type {?} */ value = self._easing.getAnimateValue({
                        name: self.animation,
                        t: currentTime,
                        b: from,
                        c: changeInValue,
                        d: duration
                    });
                    self._setPath(value);
                    self.onRender.emit(value);
                    if (id === self._lastAnimationId && currentTime < duration) {
                        requestAnimationFrame(animation);
                    }
                });
            };
            if (_this.animationDelay > 0) {
                setTimeout(start, _this.animationDelay);
            }
            else {
                start();
            }
        });
    };
    /**
     * Sets the path dimensions.
     * @param {?} value
     * @return {?}
     */
    RoundProgressComponent.prototype._setPath = /**
     * Sets the path dimensions.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this._path) {
            this._renderer.setElementAttribute(this._path.nativeElement, 'd', this._service.getArc(value, this.max, this.radius - this.stroke / 2, this.radius, this.semicircle));
        }
    };
    /**
     * Clamps a value between the maximum and 0.
     * @param {?} value
     * @return {?}
     */
    RoundProgressComponent.prototype._clamp = /**
     * Clamps a value between the maximum and 0.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Math.max(0, Math.min(value || 0, this.max));
    };
    /** Determines the SVG transforms for the <path> node. */
    /**
     * Determines the SVG transforms for the <path> node.
     * @return {?}
     */
    RoundProgressComponent.prototype.getPathTransform = /**
     * Determines the SVG transforms for the <path> node.
     * @return {?}
     */
    function () {
        var /** @type {?} */ diameter = this._diameter;
        if (this.semicircle) {
            return this.clockwise ?
                "translate(0, " + diameter + ") rotate(-90)" :
                "translate(" + (diameter + ',' + diameter) + ") rotate(90) scale(-1, 1)";
        }
        else if (!this.clockwise) {
            return "scale(-1, 1) translate(-" + diameter + " 0)";
        }
    };
    /** Resolves a color through the service. */
    /**
     * Resolves a color through the service.
     * @param {?} color
     * @return {?}
     */
    RoundProgressComponent.prototype.resolveColor = /**
     * Resolves a color through the service.
     * @param {?} color
     * @return {?}
     */
    function (color) {
        return this._service.resolveColor(color);
    };
    /** Change detection callback. */
    /**
     * Change detection callback.
     * @param {?} changes
     * @return {?}
     */
    RoundProgressComponent.prototype.ngOnChanges = /**
     * Change detection callback.
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.elementHeight = this.sanitizer.bypassSecurityTrustStyle((this._elementHeight).toString());
        this.paddingBottom = this.sanitizer.bypassSecurityTrustStyle((this._paddingBottom).toString());
        this.viewBoxAt = this.sanitizer.bypassSecurityTrustStyle(this._viewBox.toString());
        this.diameter = this.sanitizer.bypassSecurityTrustStyle((this._diameter).toString());
        this.pathTransform = this.sanitizer.bypassSecurityTrustStyle((this.getPathTransform).toString());
        this.resColor = this.sanitizer.bypassSecurityTrustStyle((this.resolveColor).toString());
        if (changes.current) {
            this._animateChange(changes.current.previousValue, changes.current.currentValue);
        }
        else {
            this._setPath(this.current);
        }
    };
    /** Diameter of the circle. */
    /**
     * Diameter of the circle.
     * @return {?}
     */
    RoundProgressComponent.prototype._diameter = /**
     * Diameter of the circle.
     * @return {?}
     */
    function () {
        return (this.radius * 2);
    };
    /** The CSS height of the wrapper element. */
    /**
     * The CSS height of the wrapper element.
     * @return {?}
     */
    RoundProgressComponent.prototype._elementHeight = /**
     * The CSS height of the wrapper element.
     * @return {?}
     */
    function () {
        if (!this.responsive) {
            return (this.semicircle ? this.radius : this.diameter) + 'px';
        }
    };
    /** Viewbox for the SVG element. */
    /**
     * Viewbox for the SVG element.
     * @return {?}
     */
    RoundProgressComponent.prototype._viewBox = /**
     * Viewbox for the SVG element.
     * @return {?}
     */
    function () {
        var /** @type {?} */ diameter = this._diameter;
        return "0 0 " + diameter + " " + (this.semicircle ? this.radius : diameter);
    };
    /** Bottom padding for the wrapper element. */
    /**
     * Bottom padding for the wrapper element.
     * @return {?}
     */
    RoundProgressComponent.prototype._paddingBottom = /**
     * Bottom padding for the wrapper element.
     * @return {?}
     */
    function () {
        if (this.responsive) {
            return this.semicircle ? '50%' : '100%';
        }
    };
    RoundProgressComponent.decorators = [
        { type: Component, args: [{
                    selector: 'round-progress',
                    template: "\n        <svg xmlns=\"https://www.w3.org/2000/svg\" [attr.viewBoxAt]=\"viewBoxAt[innerHTML]\">\n            <circle\n            fill=\"none\"\n            [attr.cx]=\"radius\"\n            [attr.cy]=\"radius\"\n            [attr.r]=\"radius - stroke / 2\"\n            [style.stroke]=\"resolveColor(background)\"\n            [style.stroke-width]=\"stroke\"/>\n\n            <path\n            #path\n            fill=\"none\"\n            [style.stroke-width]=\"stroke\"\n            [style.stroke]=\"resolveColor(color)\"\n            [style.stroke-linecap]=\"rounded ? 'round' : ''\"\n            [attr.transform]=\"pathTransform[innerHTML]\"/>\n        </svg>\n    ",
                    host: {
                        'role': 'progressbar',
                        '[attr.aria-valuemin]': 'current',
                        '[attr.aria-valuemax]': 'max',
                        '[style.width]': "responsive ? '' : diameter[innerHTML] + 'px'",
                        '[style.height]': "elementHeight",
                        '[style.padding-bottom]': "paddingBottom",
                        '[class.responsive]': 'responsive'
                    },
                    styles: [
                        ":host {\n            display: block;\n            position: relative;\n            overflow: hidden;\n        }",
                        ":host.responsive {\n            width: 100%;\n            padding-bottom: 100%;\n        }",
                        ":host.responsive > svg {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            top: 0;\n            left: 0;\n        }"
                    ]
                },] },
    ];
    /** @nocollapse */
    RoundProgressComponent.ctorParameters = function () { return [
        { type: RoundProgressService, },
        { type: RoundProgressEase, },
        { type: RoundProgressConfig, },
        { type: NgZone, },
        { type: Renderer, },
        { type: DomSanitizer, },
    ]; };
    RoundProgressComponent.propDecorators = {
        "_path": [{ type: ViewChild, args: ['path',] },],
        "current": [{ type: Input },],
        "max": [{ type: Input },],
        "radius": [{ type: Input },],
        "animation": [{ type: Input },],
        "animationDelay": [{ type: Input },],
        "duration": [{ type: Input },],
        "stroke": [{ type: Input },],
        "color": [{ type: Input },],
        "background": [{ type: Input },],
        "responsive": [{ type: Input },],
        "clockwise": [{ type: Input },],
        "semicircle": [{ type: Input },],
        "rounded": [{ type: Input },],
        "onRender": [{ type: Output },],
    };
    return RoundProgressComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    SafeHtmlPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        console.log(this.sanitized.bypassSecurityTrustHtml(value));
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe.decorators = [
        { type: Pipe, args: [{ name: 'safeHtml' },] },
    ];
    /** @nocollapse */
    SafeHtmlPipe.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    return SafeHtmlPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RoundProgressModule = (function () {
    function RoundProgressModule() {
    }
    RoundProgressModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    RoundProgressModule.ctorParameters = function () { return []; };
    return RoundProgressModule;
}());

export { RoundProgressModule, RoundProgressComponent, SafeHtmlPipe, RoundProgressService, RoundProgressEase, RoundProgressConfig };
