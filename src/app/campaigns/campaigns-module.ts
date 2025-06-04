import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing-module';
import { CampaignsListComponent } from './campaigns-list-component/campaigns-list-component';


@NgModule({
  declarations: [
    CampaignsListComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    NgClass
  ]
})
export class CampaignsModule { }
