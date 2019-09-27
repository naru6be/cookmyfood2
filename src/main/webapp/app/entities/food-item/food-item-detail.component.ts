import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFoodItem } from 'app/shared/model/food-item.model';

@Component({
  selector: 'jhi-food-item-detail',
  templateUrl: './food-item-detail.component.html'
})
export class FoodItemDetailComponent implements OnInit {
  foodItem: IFoodItem;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ foodItem }) => {
      this.foodItem = foodItem;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
