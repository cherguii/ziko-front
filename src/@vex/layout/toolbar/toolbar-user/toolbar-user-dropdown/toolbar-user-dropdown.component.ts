import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '../../../../utils/track-by';
import { PopoverRef } from '../../../../components/popover/popover-ref';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserDropdownComponent implements OnInit {

  items: MenuItem[] = [
    {
      id: '1',
      icon: 'mat:account_circle',
      label: 'Mon Profil',
      description: 'Personal Information',
      colorClass: 'text-teal',
      route: '/account'
    },
    // {
    //   id: '2',
    //   icon: 'mat:assignment',
    //   label: 'Mes annonces',
    //   description: 'Tasks & Active Projects',
    //   colorClass: 'text-amber',
    //   route: '/my-annonces'
    // },
    {
      id: '3',
      icon: 'mat:settings',
      label: 'Paramètres',
      description: 'Pricing & Current Plan',
      colorClass: 'text-purple',
      route: '/settings'
    }
  ];

  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'En ligne',
      icon: 'mat:check_circle',
      colorClass: 'text-green'
    },
    {
      id: 'away',
      label: 'Absent',
      icon: 'mat:access_time',
      colorClass: 'text-orange'
    },
    {
      id: 'dnd',
      label: 'Ne pas déranger',
      icon: 'mat:do_not_disturb',
      colorClass: 'text-red'
    },
    {
      id: 'offline',
      label: 'Hors ligne',
      icon: 'mat:offline_bolt',
      colorClass: 'text-gray'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;

  constructor(private cd: ChangeDetectorRef,
              private popoverRef: PopoverRef<ToolbarUserDropdownComponent>) { }

  ngOnInit() {
  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }
}
