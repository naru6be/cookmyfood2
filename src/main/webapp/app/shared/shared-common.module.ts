import { NgModule } from '@angular/core';

import { CookmyfoodSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [CookmyfoodSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [CookmyfoodSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CookmyfoodSharedCommonModule {}
