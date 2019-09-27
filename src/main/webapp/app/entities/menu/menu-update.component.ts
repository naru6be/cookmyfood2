import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMenu, Menu } from 'app/shared/model/menu.model';
import { MenuService } from './menu.service';
import { IUser, UserService } from 'app/core';
import { IFoodItem } from 'app/shared/model/food-item.model';
import { FoodItemService } from 'app/entities/food-item';
import { IVendor } from 'app/shared/model/vendor.model';
import { VendorService } from 'app/entities/vendor';

@Component({
  selector: 'jhi-menu-update',
  templateUrl: './menu-update.component.html'
})
export class MenuUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  fooditems: IFoodItem[];

  vendors: IVendor[];

  editForm = this.fb.group({
    id: [],
    user: [],
    fooditem: [],
    vendor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected menuService: MenuService,
    protected userService: UserService,
    protected foodItemService: FoodItemService,
    protected vendorService: VendorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.updateForm(menu);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.foodItemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFoodItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFoodItem[]>) => response.body)
      )
      .subscribe((res: IFoodItem[]) => (this.fooditems = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.vendorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVendor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVendor[]>) => response.body)
      )
      .subscribe((res: IVendor[]) => (this.vendors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(menu: IMenu) {
    this.editForm.patchValue({
      id: menu.id,
      user: menu.user,
      fooditem: menu.fooditem,
      vendor: menu.vendor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const menu = this.createFromForm();
    if (menu.id !== undefined) {
      this.subscribeToSaveResponse(this.menuService.update(menu));
    } else {
      this.subscribeToSaveResponse(this.menuService.create(menu));
    }
  }

  private createFromForm(): IMenu {
    return {
      ...new Menu(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      fooditem: this.editForm.get(['fooditem']).value,
      vendor: this.editForm.get(['vendor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenu>>) {
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

  trackFoodItemById(index: number, item: IFoodItem) {
    return item.id;
  }

  trackVendorById(index: number, item: IVendor) {
    return item.id;
  }
}
