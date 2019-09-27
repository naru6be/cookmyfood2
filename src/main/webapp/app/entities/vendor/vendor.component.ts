import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IVendor } from 'app/shared/model/vendor.model';
import { AccountService } from 'app/core';
import { VendorService } from './vendor.service';

@Component({
  selector: 'jhi-vendor',
  templateUrl: './vendor.component.html'
})
export class VendorComponent implements OnInit, OnDestroy {
  vendors: IVendor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected vendorService: VendorService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

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

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVendors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVendor) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInVendors() {
    this.eventSubscriber = this.eventManager.subscribe('vendorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
