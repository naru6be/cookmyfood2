import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CookmyfoodSharedModule } from 'app/shared';
import { CookmyfoodCoreModule } from 'app/core';
import { CookmyfoodAppRoutingModule } from './app-routing.module';
import { CookmyfoodHomeModule } from './home/home.module';
import { CookmyfoodAccountModule } from './account/account.module';
import { CookmyfoodEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import {AccordionModule, RatingModule, CalendarModule, ButtonModule,PanelModule } from 'primeng/primeng'; 
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MenuofVendorComponent } from './menuofvendor/menuofvendor.component';
import { CookmyfoodMenuOfVendorModule} from './menuofvendor/menuofvendor.module';  
@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000
    }),CookmyfoodSharedModule.forRoot(),CookmyfoodMenuOfVendorModule,CookmyfoodCoreModule,CookmyfoodHomeModule,CookmyfoodAccountModule,CookmyfoodEntityModule,CookmyfoodAppRoutingModule,TabMenuModule,BrowserAnimationsModule,AccordionModule,PanelModule, RatingModule, CalendarModule, ButtonModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class CookmyfoodAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
