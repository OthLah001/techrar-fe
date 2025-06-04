import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, interval, Subscription, switchMap } from 'rxjs';
import { CampaignsService } from '../campaigns.service';
import { TCampaign, TNotification } from '../campaigns.types';

@Component({
  selector: 'app-notifications-list-component',
  standalone: false,
  templateUrl: './notifications-list-component.html',
  styleUrl: './notifications-list-component.scss'
})
export class NotificationsListComponent {
  campaignId!: number;
  campaign: TCampaign | null = null;
  notifications: TNotification[] = [];
  count = 0;
  limit = 10;
  offset = 0;

  error: string | null = null;
  refreshSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private campaignsService: CampaignsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.campaignId = Number(params.get('id'));
      this.loadCampaignAndNotifications();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }

  loadCampaignAndNotifications() {
    forkJoin({
      campaign: this.campaignsService.getCampaignById(this.campaignId),
      notifications: this.fetchNotifications()
    }).subscribe({
      next: ({ campaign, notifications }) => {
        this.campaign = campaign;
        this.notifications = notifications.items;
        this.count = notifications.count;
        this.error = null;

        if (!this.refreshSub || this.refreshSub.closed) {
          this.refreshNotifications();
        }
      },
      error: (err) => {
        this.error = 'Failed to load campaign or notifications.';
      }
    });
  }

  refreshNotifications() {
      this.refreshSub = interval(5000).pipe(
        switchMap(() => this.fetchNotifications())
      ).subscribe((res) => {
        this.notifications = res.items;
        this.count = res.count;
      });
  }

  fetchNotifications() {
    return this.campaignsService.getNotificationsList(this.campaignId, this.limit, this.offset);
  }

  nextPage() {
    if (this.offset + this.limit < this.count) {
      this.offset += this.limit;
      this.loadCampaignAndNotifications();
    }
  }

  prevPage() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.loadCampaignAndNotifications();
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  get currentPage() {
    return Math.floor(this.offset / this.limit) + 1;
  }

  get totalPages() {
    return Math.ceil(this.count / this.limit);
  }
}
