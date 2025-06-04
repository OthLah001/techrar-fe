import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { CampaignsListComponent } from './campaigns-list-component/campaigns-list-component';
import { CreateCampaignComponent } from './create-campaign-component/create-campaign-component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: CampaignsListComponent,
      canActivate: [AuthenticatedGuard],
    },
    {
      path: 'new',
      component: CreateCampaignComponent,
      canActivate: [AuthenticatedGuard],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
