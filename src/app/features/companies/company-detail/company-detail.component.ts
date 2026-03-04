import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminCompanyService } from '../../../core/tenancy/admin-company.service';
import { CompanyDto, CompanyRole, SubscriptionTier } from '@synctaskpro/contracts';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss',
})
export class CompanyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private companyService = inject(AdminCompanyService);

  company = signal<CompanyDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/admin/companies']);
      return;
    }
    this.loadCompany(id);
  }

  private loadCompany(id: string): void {
    this.loading.set(true);
    this.companyService.getCompany(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.company.set(res.data);
        } else {
          this.error.set(res.message || 'Company not found');
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load company');
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/companies']);
  }

  getSubscriptionLabel(tier: number): string {
    switch (tier) {
      case SubscriptionTier.Free:
        return 'Free';
      case SubscriptionTier.Starter:
        return 'Starter';
      case SubscriptionTier.Professional:
        return 'Professional';
      case SubscriptionTier.Enterprise:
        return 'Enterprise';
      default:
        return 'Unknown';
    }
  }

  getSubscriptionClass(tier: number): string {
    switch (tier) {
      case SubscriptionTier.Free:
        return 'tier-free';
      case SubscriptionTier.Starter:
        return 'tier-starter';
      case SubscriptionTier.Professional:
        return 'tier-professional';
      case SubscriptionTier.Enterprise:
        return 'tier-enterprise';
      default:
        return '';
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
}
