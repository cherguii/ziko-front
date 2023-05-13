import { Component, Input, OnInit } from '@angular/core';
import { trackByValue } from '../../utils/track-by';

@Component({
  selector: 'vex-breadcrumbs',
  template: `
    <div class="flex items-center">
      <vex-breadcrumb>
        <a [routerLink]="['/']" style="color: #4183d7;">
          Accueil
        </a>
      </vex-breadcrumb>
      
      <ng-container *ngFor="let crumb of crumbs; trackBy: trackByValue">
        <div class="ltr:mr-2 rtl:ml-2">/</div>
        <vex-breadcrumb>
          <a [routerLink]="[]" style="color: #4183d7;">{{ crumb }}</a>
        </vex-breadcrumb>
      </ng-container>
    </div>
  `
})
export class BreadcrumbsComponent implements OnInit {

  @Input() crumbs: string[] = [];

  trackByValue = trackByValue;

  constructor() {
  }

  ngOnInit() {
  }
}
