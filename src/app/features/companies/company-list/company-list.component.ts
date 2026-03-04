import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCompanyService } from '../../../core/tenancy/admin-company.service';
import { CompanyDto, SubscriptionTier } from '@synctaskpro/contracts';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
  private companyService = inject(AdminCompanyService);
  private router = inject(Router);

  companies = signal<CompanyDto[]>([]);
  totalCount = signal(0);
  totalPages = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  loading = signal(false);
  searchTerm = '';

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadCompanies();
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
        this.currentPage.set(1);
        this.loadCompanies();
      });
  }

  loadCompanies(): void {
    this.loading.set(true);
    this.companyService
      .getCompanies(this.currentPage(), this.pageSize(), this.searchTerm || undefined)
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.companies.set(res.data.items);
            this.totalCount.set(res.data.totalCount);
            this.totalPages.set(res.data.totalPages);
          }
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadCompanies();
  }

  navigateToCompany(id: string): void {
    this.router.navigate(['/admin/companies', id]);
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

  get pages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    const end = Math.min(total, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
