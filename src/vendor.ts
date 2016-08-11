// Polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

import 'ts-helpers';

if (IS_DEV) {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}

if (IS_TEST) {
  require('zone.js/dist/zone');
  require('zone.js/dist/long-stack-trace-zone');
  require('zone.js/dist/jasmine-patch');
  require('zone.js/dist/async-test');
  require('zone.js/dist/fake-async-test');
  require('zone.js/dist/sync-test');
}

// Angular 2
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';

// RxJS
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/zip';

import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/pluck';

// NgRx
//import '@ngrx/core/add/operator/select';
//import '@ngrx/store';
//import '@ngrx/effects';
