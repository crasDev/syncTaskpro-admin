import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminAuditService } from '../../core/audit/admin-audit.service';
import { AuditEntryDto, AuditCategory, AuditSeverity } from '@synctaskpro/contracts';

interface FilterOption<T> {
  label: string;
  value: T | undefined;
}

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss',
})
export class AuditLogComponent implements OnInit {
  private auditService = inject(AdminAuditService);

  entries = signal<AuditEntryDto[]>([]);
  isLoading = signal(true);
  page = signal(1);
  totalPages = signal(1);
  totalCount = signal(0);

  selectedCategory = signal<AuditCategory | undefined>(undefined);
  selectedSeverity = signal<AuditSeverity | undefined>(undefined);

  categories: FilterOption<AuditCategory>[] = [
    { label: 'All Categories', value: undefined },
    { label: 'Authentication', value: AuditCategory.Authentication },
    { label: 'Profile', value: AuditCategory.Profile },
    { label: 'Company', value: AuditCategory.Company },
    { label: 'Membership', value: AuditCategory.Membership },
    { label: 'Ownership', value: AuditCategory.Ownership },
    { label: 'Security', value: AuditCategory.Security },
    { label: 'Data', value: AuditCategory.Data },
    { label: 'Workflow', value: AuditCategory.Workflow },
    { label: 'Finance', value: AuditCategory.Finance },
    { label: 'HR', value: AuditCategory.HR },
    { label: 'System', value: AuditCategory.System },
  ];

  severities: FilterOption<AuditSeverity>[] = [
    { label: 'All Severities', value: undefined },
    { label: 'Low', value: AuditSeverity.Low },
    { label: 'Medium', value: AuditSeverity.Medium },
    { label: 'High', value: AuditSeverity.High },
    { label: 'Critical', value: AuditSeverity.Critical },
  ];

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
    this.isLoading.set(true);
    this.auditService.getAuditLog(
      this.page(), 50,
      this.selectedCategory(),
      this.selectedSeverity(),
    ).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.entries.set(res.data.items);
          this.totalPages.set(res.data.totalPages);
          this.totalCount.set(res.data.totalCount);
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value ? Number(value) as AuditCategory : undefined);
    this.page.set(1);
    this.loadEntries();
  }

  onSeverityChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedSeverity.set(value ? Number(value) as AuditSeverity : undefined);
    this.page.set(1);
    this.loadEntries();
  }

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
    this.loadEntries();
  }

  getCategoryLabel(c: AuditCategory): string {
    return this.categories.find(cat => cat.value === c)?.label ?? 'Other';
  }

  getSeverityClass(s: AuditSeverity): string {
    switch (s) {
      case AuditSeverity.Critical: return 'severity-critical';
      case AuditSeverity.High: return 'severity-high';
      case AuditSeverity.Medium: return 'severity-medium';
      default: return 'severity-low';
    }
  }

  getSeverityLabel(s: AuditSeverity): string {
    switch (s) {
      case AuditSeverity.Critical: return 'Critical';
      case AuditSeverity.High: return 'High';
      case AuditSeverity.Medium: return 'Medium';
      default: return 'Low';
    }
  }
}
