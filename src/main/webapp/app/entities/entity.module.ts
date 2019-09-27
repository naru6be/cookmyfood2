import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'vendor',
        loadChildren: './vendor/vendor.module#CookmyfoodVendorModule'
      },
      {
        path: 'menu',
        loadChildren: './menu/menu.module#CookmyfoodMenuModule'
      },
      {
        path: 'food-item',
        loadChildren: './food-item/food-item.module#CookmyfoodFoodItemModule'
      },
      {
        path: 'order',
        loadChildren: './order/order.module#CookmyfoodOrderModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookmyfoodEntityModule {}
