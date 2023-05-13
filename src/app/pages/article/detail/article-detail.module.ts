import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-detail-routing.module';
import { ArticleDetailComponent } from './article-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { SidebarModule } from 'src/@vex/components/sidebar/sidebar.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryModule } from '@ks89/angular-modal-gallery';

@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    SidebarModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatRippleModule,
    PageLayoutModule,
    NgxNumberSpinnerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    GalleryModule,
  ]
})
export class ArticleDetailModule {
}

