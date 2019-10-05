import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookmyfoodSharedModule } from 'app/shared';
import { MENUOFVENDOR_ROUTE, MenuofVendorComponent } from './';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {ButtonModule, PanelModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {SpinnerModule} from 'primeng/spinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
@NgModule({
  imports: [CookmyfoodSharedModule,SpinnerModule,MessagesModule,MessageModule,DialogModule,BrowserAnimationsModule,TabMenuModule,ButtonModule, PanelModule, RouterModule.forChild([MENUOFVENDOR_ROUTE])],
  declarations: [MenuofVendorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookmyfoodMenuOfVendorModule {}
