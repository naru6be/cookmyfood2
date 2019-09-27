import { IMenu } from 'app/shared/model/menu.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IVendor {
  id?: number;
  name?: string;
  imageContentType?: string;
  image?: any;
  menus?: IMenu[];
  orders?: IOrder[];
}

export class Vendor implements IVendor {
  constructor(
    public id?: number,
    public name?: string,
    public imageContentType?: string,
    public image?: any,
    public menus?: IMenu[],
    public orders?: IOrder[]
  ) {}
}
