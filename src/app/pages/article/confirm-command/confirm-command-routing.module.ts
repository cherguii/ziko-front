import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ConfirmCommandComponent } from './confirm-command.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: ConfirmCommandComponent,
    data: {
      toolbarShadowEnabled: true
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ConfirmCommandRoutingModule {
}
