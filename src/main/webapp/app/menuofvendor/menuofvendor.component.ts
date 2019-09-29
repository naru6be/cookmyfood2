import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMenu } from 'app/shared/model/menu.model';
import { AccountService } from 'app/core';
import { MenuService } from 'app/entities/menu/menu.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'jhi-menuofvendor',
  templateUrl: './menuofvendor.component.html',
  styleUrls: ['./menuofvendor.component.scss']
})
export class MenuofVendorComponent implements OnInit {

  menus: IMenu[];
  currentAccount: any;
  eventSubscriber: Subscription;
  vendorName:String;

  constructor(
    protected menuService: MenuService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected route: ActivatedRoute
  ) {}

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
}
