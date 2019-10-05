import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMenu } from 'app/shared/model/menu.model';
import { AccountService } from 'app/core';
import { MenuService } from 'app/entities/menu/menu.service';
import { ActivatedRoute } from "@angular/router";
import {DialogModule} from 'primeng/dialog';
import { Menu1 } from '../shared/model/menu1.model';
import {Message} from 'primeng/components/common/api';
@Component({
  selector: 'jhi-menuofvendor',
  templateUrl: './menuofvendor.component.html',
  styleUrls: ['./menuofvendor.component.scss']
})
export class MenuofVendorComponent implements OnInit {

  menus1: Menu1[]=[];
 
  menus: IMenu[];
  currentAccount: any;
  eventSubscriber: Subscription;
  vendorName:String;
  displayOrder: boolean = false;
  displayPay: boolean = false;
  quantity: number=0;
  total:number;
  cost:number;
  finalTotal:number=0;
  public menu1: Menu1;
  message: String;
  msgs: Message[] = [];
  constructor(
    protected menuService: MenuService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected route: ActivatedRoute
  ) {

     
  }

  loadAll() {
    this.menuService
      .query()
      .pipe(
        filter((res: HttpResponse<IMenu[]>) => res.ok),
        map((res: HttpResponse<IMenu[]>) => res.body)
      )
      .subscribe(
        (res: IMenu[]) => {
          this.menus = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.vendorName = this.route.snapshot.params['name'];
    this.vendorName= this.vendorName.substring(0, this.vendorName.length - 1);
    console.log(this.vendorName  + "Hello")
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMenus();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMenu) {
    return item.id;
  }

  registerChangeInMenus() {
    this.eventSubscriber = this.eventManager.subscribe('menuListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
  showDialog(foodname:String,cost:number) {
    this.displayOrder = true;
    this.cost=cost;
    this.menu1=new Menu1();
    this.menu1.cost=cost;

    //this.menu1.cost=cost;
    this.menu1.name=foodname;
}


updateTotal() {
  
  this.menu1.selectedquantity=this.quantity;
  this.menu1.totalcost=this.menu1.selectedquantity*this.menu1.cost;
  //alert(this.menu1.selectedquantity*this.menu1.cost);
  //alert(this.quantity*this.menu1.cost);
  this.menus1.push(this.menu1);
  this.menu1=null;
  this.displayOrder = false;
  this.showSuccessOrder() 
}
updateTotal1() {
 this.displayPay = false;
  this.showSuccessPay() 
}
showSuccessOrder() {
  this.msgs = [];
  this.displayOrder = false;
  this.msgs.push({severity:'success', summary:'Success Message', detail:'Item added successfully !!'});
}
showDialogPay()
{
  this.displayPay = true;
}
showSuccessPay() {
  this.displayPay = false;
  this.msgs = [];
  this.msgs.push({severity:'success', summary:'Success Message', detail:'Please pay @ Restaurant Outlet !!'});
}
}
