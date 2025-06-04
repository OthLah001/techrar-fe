import { Component } from '@angular/core';
import { TCampaign } from '../campaigns.types';
import { CampaignsService } from '../campaigns.service';

@Component({
  selector: 'app-campaigns-list-component',
  standalone: false,
  templateUrl: './campaigns-list-component.html',
  styleUrl: './campaigns-list-component.scss'
})
export class CampaignsListComponent {
  campaigns: TCampaign[] = [];
  count = 0;
  limit = 10;
  offset = 0;

  constructor(
    private campaignsService: CampaignsService,
  ) { }

  get currentPage() {
    return Math.floor(this.offset / this.limit) + 1;
  }

  get totalPages() {
    return Math.ceil(this.count / this.limit);
  }

  ngOnInit(): void {
    this.fetchCampaigns();
  }

  fetchCampaigns() {
    this.campaignsService.getCampaignsList(
      this.limit,
      this.offset
    ).subscribe((resp) => {
        this.campaigns = resp.items;
        this.count = resp.count;
      });
  }

  nextPage() {
    this.offset += this.limit;
    this.fetchCampaigns();
  }

  prevPage() {
    this.offset = Math.max(this.offset - this.limit, 0);
    this.fetchCampaigns();
  }

  goToNotifications(id: number) {
    window.location.href = `/campaigns/${id}/notifications`;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
}
