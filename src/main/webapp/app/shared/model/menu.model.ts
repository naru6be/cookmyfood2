import { IUser } from 'app/core/user/user.model';
import { IFoodItem } from 'app/shared/model/food-item.model';
import { IVendor } from 'app/shared/model/vendor.model';

export interface IMenu {
  id?: number;
  user?: IUser;
  fooditem?: IFoodItem;
  vendor?: IVendor;
}

export class Menu implements IMenu {
  constructor(public id?: number, public user?: IUser, public fooditem?: IFoodItem, public vendor?: IVendor) {}
}
