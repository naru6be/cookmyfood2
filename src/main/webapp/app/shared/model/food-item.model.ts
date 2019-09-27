import { IMenu } from 'app/shared/model/menu.model';
import { IOrder } from 'app/shared/model/order.model';
import { IUser } from 'app/core/user/user.model';

export interface IFoodItem {
  id?: number;
  foodname?: string;
  cost?: number;
  imageContentType?: string;
  image?: any;
  capacity?: number;
  menus?: IMenu[];
  orders?: IOrder[];
  user?: IUser;
}

export class FoodItem implements IFoodItem {
  constructor(
    public id?: number,
    public foodname?: string,
    public cost?: number,
    public imageContentType?: string,
    public image?: any,
    public capacity?: number,
    public menus?: IMenu[],
    public orders?: IOrder[],
    public user?: IUser
  ) {}
}
