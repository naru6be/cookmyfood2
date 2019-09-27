import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CookmyfoodSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CookmyfoodSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CookmyfoodSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookmyfoodSharedModule {
  static forRoot() {
    return {
      ngModule: CookmyfoodSharedModule
    };
  }
}
