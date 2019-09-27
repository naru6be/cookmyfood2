import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookmyfoodSharedModule } from 'app/shared';
import {
  FoodItemComponent,
  FoodItemDetailComponent,
  FoodItemUpdateComponent,
  FoodItemDeletePopupComponent,
  FoodItemDeleteDialogComponent,
  foodItemRoute,
  foodItemPopupRoute
} from './';

const ENTITY_STATES = [...foodItemRoute, ...foodItemPopupRoute];

@NgModule({
  imports: [CookmyfoodSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FoodItemComponent,
    FoodItemDetailComponent,
    FoodItemUpdateComponent,
    FoodItemDeleteDialogComponent,
    FoodItemDeletePopupComponent
  ],
  entryComponents: [FoodItemComponent, FoodItemUpdateComponent, FoodItemDeleteDialogComponent, FoodItemDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookmyfoodFoodItemModule {}
