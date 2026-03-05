import { Component, inject, input, output, signal } from '@angular/core';
import { AdminCompanyService } from '../../../../../core/tenancy/admin-company.service';
import { CompanyDto, SubscriptionTier } from '@synctaskpro/contracts';

@Component({
  selector: 'app-admin-tools-tab',
  standalone: true,
  imports: [],
  templateUrl: './admin-tools-tab.component.html',
  styleUrl: './admin-tools-tab.component.scss',
})
export class AdminToolsTabComponent {
  company = input.required<CompanyDto>();
  updated = output<CompanyDto>();

  private companyService = inject(AdminCompanyService);

  saving = signal(false);
  message = signal<string | null>(null);

  tiers = [
    { value: SubscriptionTier.Free, label: 'Free' },
    { value: SubscriptionTier.Starter, label: 'Starter' },
    { value: SubscriptionTier.Professional, label: 'Professional' },
    { value: SubscriptionTier.Enterprise, label: 'Enterprise' },
  ];

  toggleVerification(): void {
    this.saving.set(true);
    this.message.set(null);
    const newValue = !this.company().isVerified;

    this.companyService
      .verifyCompany(this.company().id, { isVerified: newValue })
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.updated.emit(res.data);
            this.message.set(newValue ? 'Company verified.' : 'Verification removed.');
          } else {
            this.message.set(res.message || 'Failed to update verification.');
          }
          this.saving.set(false);
        },
        error: () => {
          this.message.set('Failed to update verification.');
          this.saving.set(false);
        },
      });
  }

  changeSubscription(tier: SubscriptionTier): void {
    if (tier === this.company().subscriptionTier) return;

    this.saving.set(true);
    this.message.set(null);

    this.companyService
      .changeSubscription(this.company().id, { newTier: tier })
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.updated.emit(res.data);
            this.message.set(`Subscription changed to ${this.getTierLabel(tier)}.`);
          } else {
            this.message.set(res.message || 'Failed to change subscription.');
          }
          this.saving.set(false);
        },
        error: () => {
          this.message.set('Failed to change subscription.');
          this.saving.set(false);
        },
      });
  }

  getTierLabel(tier: SubscriptionTier): string {
    return this.tiers.find((t) => t.value === tier)?.label || 'Unknown';
  }
}
