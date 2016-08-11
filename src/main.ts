import {NgModule, enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';

if (IS_PROD) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
