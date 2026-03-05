import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminCompanyService } from '../../../../../core/tenancy/admin-company.service';
import { CompanyInviteDto, CompanyRole, InviteStatus } from '@synctaskpro/contracts';

@Component({
  selector: 'app-admin-invites-tab',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-invites-tab.component.html',
  styleUrl: './admin-invites-tab.component.scss',
})
export class AdminInvitesTabComponent implements OnInit {
  companyId = input.required<string>();

  private companyService = inject(AdminCompanyService);

  invites = signal<CompanyInviteDto[]>([]);
  loading = signal(true);
  page = signal(1);
  totalPages = signal(0);
  totalCount = signal(0);
  pageSize = 20;

  ngOnInit(): void {
    this.loadInvites();
  }

  loadInvites(): void {
    this.loading.set(true);
    this.companyService
      .getCompanyInvites(this.companyId(), this.page(), this.pageSize)
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.invites.set(res.data.items);
            this.totalPages.set(res.data.totalPages);
            this.totalCount.set(res.data.totalCount);
          }
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadInvites();
    }
  }

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.loadInvites();
    }
  }

  getRoleLabel(role: number): string {
    switch (role) {
      case CompanyRole.Owner: return 'Owner';
      case CompanyRole.Admin: return 'Admin';
      case CompanyRole.Manager: return 'Manager';
      case CompanyRole.Member: return 'Member';
      case CompanyRole.ReadOnly: return 'Read Only';
      default: return 'Unknown';
    }
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case InviteStatus.Pending: return 'Pending';
      case InviteStatus.Accepted: return 'Accepted';
      case InviteStatus.Declined: return 'Declined';
      case InviteStatus.Expired: return 'Expired';
      case InviteStatus.Cancelled: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case InviteStatus.Pending: return 'status-pending';
      case InviteStatus.Accepted: return 'status-accepted';
      case InviteStatus.Declined: return 'status-declined';
      case InviteStatus.Expired: return 'status-expired';
      case InviteStatus.Cancelled: return 'status-cancelled';
      default: return '';
    }
  }
}
