import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmCommandRoutingModule } from './confirm-command-routing.module';
import { ConfirmCommandComponent } from './confirm-command.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ConfirmCommandComponent],
  imports: [
    CommonModule,
    ConfirmCommandRoutingModule,
    PageLayoutModule,
    MatButtonModule,

    MatRippleModule,
    MatIconModule
  ]
})
export class ConfirmCommandModule {
}
