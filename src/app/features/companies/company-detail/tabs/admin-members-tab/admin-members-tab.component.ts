import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminCompanyService } from '../../../../../core/tenancy/admin-company.service';
import { CompanyMemberDto, CompanyRole } from '@synctaskpro/contracts';

@Component({
  selector: 'app-admin-members-tab',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-members-tab.component.html',
  styleUrl: './admin-members-tab.component.scss',
})
export class AdminMembersTabComponent implements OnInit {
  companyId = input.required<string>();

  private companyService = inject(AdminCompanyService);

  members = signal<CompanyMemberDto[]>([]);
  loading = signal(true);
  page = signal(1);
  totalPages = signal(0);
  totalCount = signal(0);
  pageSize = 20;

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.loading.set(true);
    this.companyService
      .getCompanyMembers(this.companyId(), this.page(), this.pageSize)
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.members.set(res.data.items);
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
      this.loadMembers();
    }
  }

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.loadMembers();
    }
  }

  getRoleLabel(role: number): string {
    switch (role) {
      case CompanyRole.Owner:
        return 'Owner';
      case CompanyRole.Admin:
        return 'Admin';
      case CompanyRole.Manager:
        return 'Manager';
      case CompanyRole.Member:
        return 'Member';
      case CompanyRole.ReadOnly:
        return 'Read Only';
      default:
        return 'Unknown';
    }
  }

  getRoleClass(role: number): string {
    switch (role) {
      case CompanyRole.Owner:
        return 'role-owner';
      case CompanyRole.Admin:
        return 'role-admin';
      case CompanyRole.Manager:
        return 'role-manager';
      default:
        return 'role-member';
    }
  }

  isOwner(member: CompanyMemberDto): boolean {
    return member.role === CompanyRole.Owner;
  }

  getInitials(member: CompanyMemberDto): string {
    const f = member.firstName?.[0] || '';
    const l = member.lastName?.[0] || '';
    return (f + l).toUpperCase() || member.email[0].toUpperCase();
  }
}
