import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';

import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {ButtonModule, PanelModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { VendorService } from 'app/entities/vendor/vendor.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IVendor } from 'app/shared/model/vendor.model';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  items1: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;
  vendors: IVendor[];
  protected dataUtils: JhiDataUtils;
  eventSubscriber: Subscription;
  constructor(
    protected vendorService: VendorService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    protected jhiAlertService: JhiAlertService
  ) {}
ngOnInit() {
  this.loadAll();
this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.registerChangeInVendors();
this.items1 = [
            {label: 'SriSai', icon: 'fa fa-fw fa-bar-chart'},
            {label: 'Palkhi', icon: 'fa fa-fw fa-calendar'},
            {label: 'Documentation', icon: 'fa fa-fw fa-book'},
            {label: 'Support', icon: 'fa fa-fw fa-support'},
            {label: 'Social', icon: 'fa faEye'}
        ];

        this.items2 = [
            {label: 'Sri Sai', icon: 'pi pi-briefcase',routerLink: ['/vendor']},
            {label: 'Palkhi', icon: 'pi pi-mobile',routerLink: ['/vendor']},
            {label: 'Cochin Bekari', icon: 'pi pi-tablet',routerLink: ['/vendor']},
            {label: 'CCD', icon: 'pi pi-check',routerLink: ['/vendor']},
            {label: 'GreenNest', icon: 'pi pi-times',routerLink: ['/vendor']}
        ];
    this.activeItem = this.items2[0];
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
closeItem(event, index) {
        this.items2 = this.items2.filter((item, i) => i !== index);
        event.preventDefault();
    }
  //load verndors
  loadAll() {
    this.vendorService
      .query()
      .pipe(
        filter((res: HttpResponse<IVendor[]>) => res.ok),
        map((res: HttpResponse<IVendor[]>) => res.body)
      )
      .subscribe(
        (res: IVendor[]) => {
          this.vendors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
  
  registerChangeInVendors() {
    this.eventSubscriber = this.eventManager.subscribe('vendorListModification', response => this.loadAll());
  }
  }
