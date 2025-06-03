import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { CampaignsListComponent } from './campaigns-list-component/campaigns-list-component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
