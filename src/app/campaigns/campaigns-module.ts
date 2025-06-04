import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing-module';
import { CampaignsListComponent } from './campaigns-list-component/campaigns-list-component';
import { CreateCampaignComponent } from './create-campaign-component/create-campaign-component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsListComponent } from './notifications-list-component/notifications-list-component';


@NgModule({
  declarations: [
    CampaignsListComponent,
    CreateCampaignComponent,
    NotificationsListComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    NgClass,
    ReactiveFormsModule
  ]
})
export class CampaignsModule { }
