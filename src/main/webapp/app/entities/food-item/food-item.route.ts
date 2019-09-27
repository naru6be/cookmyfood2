import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FoodItem } from 'app/shared/model/food-item.model';
import { FoodItemService } from './food-item.service';
import { FoodItemComponent } from './food-item.component';
import { FoodItemDetailComponent } from './food-item-detail.component';
import { FoodItemUpdateComponent } from './food-item-update.component';
import { FoodItemDeletePopupComponent } from './food-item-delete-dialog.component';
import { IFoodItem } from 'app/shared/model/food-item.model';

@Injectable({ providedIn: 'root' })
export class FoodItemResolve implements Resolve<IFoodItem> {
  constructor(private service: FoodItemService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFoodItem> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FoodItem>) => response.ok),
        map((foodItem: HttpResponse<FoodItem>) => foodItem.body)
      );
    }
    return of(new FoodItem());
  }
}

export const foodItemRoute: Routes = [
  {
    path: '',
    component: FoodItemComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FoodItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FoodItemDetailComponent,
    resolve: {
      foodItem: FoodItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FoodItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FoodItemUpdateComponent,
    resolve: {
      foodItem: FoodItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FoodItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FoodItemUpdateComponent,
    resolve: {
      foodItem: FoodItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FoodItems'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const foodItemPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FoodItemDeletePopupComponent,
    resolve: {
      foodItem: FoodItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FoodItems'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
