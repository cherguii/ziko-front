import { stagger60ms } from '../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { Component, OnInit } from '@angular/core';
import { trackByRoute } from '../../../@vex/utils/track-by';
import { Link } from 'src/@vex/interfaces/link.interface';

@Component({
  selector: 'vex-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class HomeComponent implements OnInit {

  links: (Link & { icon: string })[] = [
    {
      label: 'Getting Started',
      route: 'getting-started',
      icon: 'mat:flag'
    },
    {
      label: 'Pricing & Plans',
      route: 'pricing',
      icon: 'mat:attach_money'
    },
    {
      label: 'FAQ',
      route: 'faq',
      icon: 'mat:contact_support'
    },
    {
      label: 'Guides',
      route: 'guides',
      icon: 'mat:book'
    }
  ];

  trackByRoute = trackByRoute;

  constructor() { }

  ngOnInit() {
  }

}
