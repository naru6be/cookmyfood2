import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookmyfoodSharedModule } from 'app/shared';
import {
  VendorComponent,
  VendorDetailComponent,
  VendorUpdateComponent,
  VendorDeletePopupComponent,
  VendorDeleteDialogComponent,
  vendorRoute,
  vendorPopupRoute
} from './';

const ENTITY_STATES = [...vendorRoute, ...vendorPopupRoute];

@NgModule({
  imports: [CookmyfoodSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [VendorComponent, VendorDetailComponent, VendorUpdateComponent, VendorDeleteDialogComponent, VendorDeletePopupComponent],
  entryComponents: [VendorComponent, VendorUpdateComponent, VendorDeleteDialogComponent, VendorDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookmyfoodVendorModule {}
