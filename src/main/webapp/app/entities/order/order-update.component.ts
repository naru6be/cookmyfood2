import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { IUser, UserService } from 'app/core';
import { IVendor } from 'app/shared/model/vendor.model';
import { VendorService } from 'app/entities/vendor';
import { IFoodItem } from 'app/shared/model/food-item.model';
import { FoodItemService } from 'app/entities/food-item';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  vendors: IVendor[];

  fooditems: IFoodItem[];

  editForm = this.fb.group({
    id: [],
    employeeid: [null, [Validators.required]],
    phone: [],
    date: [null, [Validators.required]],
    cost: [],
    status: [],
    user: [],
    vendor: [],
    fooditem: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderService: OrderService,
    protected userService: UserService,
    protected vendorService: VendorService,
    protected foodItemService: FoodItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ order }) => {
      this.updateForm(order);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.vendorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVendor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVendor[]>) => response.body)
      )
      .subscribe((res: IVendor[]) => (this.vendors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.foodItemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFoodItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFoodItem[]>) => response.body)
      )
      .subscribe((res: IFoodItem[]) => (this.fooditems = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(order: IOrder) {
    this.editForm.patchValue({
      id: order.id,
      employeeid: order.employeeid,
      phone: order.phone,
      date: order.date != null ? order.date.format(DATE_TIME_FORMAT) : null,
      cost: order.cost,
      status: order.status,
      user: order.user,
      vendor: order.vendor,
      fooditem: order.fooditem
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id']).value,
      employeeid: this.editForm.get(['employeeid']).value,
      phone: this.editForm.get(['phone']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      cost: this.editForm.get(['cost']).value,
      status: this.editForm.get(['status']).value,
      user: this.editForm.get(['user']).value,
      vendor: this.editForm.get(['vendor']).value,
      fooditem: this.editForm.get(['fooditem']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackVendorById(index: number, item: IVendor) {
    return item.id;
  }

  trackFoodItemById(index: number, item: IFoodItem) {
    return item.id;
  }
}
