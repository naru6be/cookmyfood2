import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookmyfoodSharedModule } from 'app/shared';
import { MENUOFVENDOR_ROUTE, MenuofVendorComponent } from './';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {ButtonModule, PanelModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [CookmyfoodSharedModule,BrowserAnimationsModule,TabMenuModule,ButtonModule, PanelModule, RouterModule.forChild([MENUOFVENDOR_ROUTE])],
  declarations: [MenuofVendorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookmyfoodMenuOfVendorModule {}
