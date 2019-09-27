import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFoodItem } from 'app/shared/model/food-item.model';
import { AccountService } from 'app/core';
import { FoodItemService } from './food-item.service';

@Component({
  selector: 'jhi-food-item',
  templateUrl: './food-item.component.html'
})
export class FoodItemComponent implements OnInit, OnDestroy {
  foodItems: IFoodItem[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected foodItemService: FoodItemService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.foodItemService
      .query()
      .pipe(
        filter((res: HttpResponse<IFoodItem[]>) => res.ok),
        map((res: HttpResponse<IFoodItem[]>) => res.body)
      )
      .subscribe(
        (res: IFoodItem[]) => {
          this.foodItems = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFoodItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFoodItem) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInFoodItems() {
    this.eventSubscriber = this.eventManager.subscribe('foodItemListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
