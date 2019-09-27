import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IVendor } from 'app/shared/model/vendor.model';
import { IFoodItem } from 'app/shared/model/food-item.model';

export const enum Status {
  INPROGRESS = 'INPROGRESS',
  READYTOSERVE = 'READYTOSERVE',
  COMPLETED = 'COMPLETED'
}

export interface IOrder {
  id?: number;
  employeeid?: string;
  phone?: string;
  date?: Moment;
  cost?: number;
  status?: Status;
  user?: IUser;
  vendor?: IVendor;
  fooditem?: IFoodItem;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public employeeid?: string,
    public phone?: string,
    public date?: Moment,
    public cost?: number,
    public status?: Status,
    public user?: IUser,
    public vendor?: IVendor,
    public fooditem?: IFoodItem
  ) {}
}
