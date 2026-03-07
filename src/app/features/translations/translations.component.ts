import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminTranslationService } from '../../core/translations/admin-translation.service';
import {
  TranslationCoverageDto,
  TranslationEntryDto,
  TranslationStatus,
} from '@synctaskpro/contracts';

@Component({
  selector: 'app-translations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './translations.component.html',
  styleUrl: './translations.component.scss',
})
export class TranslationsComponent implements OnInit {
  private svc = inject(AdminTranslationService);

  coverage = signal<TranslationCoverageDto[]>([]);
  keys = signal<TranslationEntryDto[]>([]);
  selectedLocale = signal('en');
  selectedNamespace = signal<string | null>(null);
  isLoading = signal(false);
  editingKey = signal<string | null>(null);
  editValue = signal('');

  filteredKeys = computed(() => {
    const ns = this.selectedNamespace();
    if (!ns) return this.keys();
    return this.keys().filter(k => k.namespace === ns);
  });

  namespaces = computed(() => {
    const all = this.keys().map(k => k.namespace);
    return [...new Set(all)].sort();
  });

  statusLabel(status: TranslationStatus): string {
    switch (status) {
      case TranslationStatus.Draft: return 'Draft';
      case TranslationStatus.Published: return 'Published';
      case TranslationStatus.NeedsReview: return 'Needs Review';
      case TranslationStatus.AutoTranslated: return 'Auto';
      default: return 'Unknown';
    }
  }

  ngOnInit(): void {
    this.loadCoverage();
    this.loadKeys();
  }

  loadCoverage(): void {
    this.svc.getCoverage().subscribe({
      next: (res) => {
        if (res.success && res.data) this.coverage.set(res.data);
      }
    });
  }

  loadKeys(): void {
    this.isLoading.set(true);
    this.svc.getKeys(this.selectedLocale()).subscribe({
      next: (res) => {
        if (res.success && res.data) this.keys.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  selectLocale(locale: string): void {
    this.selectedLocale.set(locale);
    this.loadKeys();
  }

  startEdit(key: TranslationEntryDto): void {
    this.editingKey.set(key.key);
    this.editValue.set(key.value);
  }

  saveEdit(entry: TranslationEntryDto): void {
    this.svc.upsertKey({
      key: entry.key,
      locale: this.selectedLocale(),
      namespace: entry.namespace,
      value: this.editValue(),
      status: TranslationStatus.Published
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.editingKey.set(null);
          this.loadKeys();
          this.loadCoverage();
        }
      }
    });
  }

  cancelEdit(): void {
    this.editingKey.set(null);
  }

  triggerAutoTranslate(locale: string): void {
    this.svc.triggerAutoTranslate({
      sourceLocale: 'en',
      targetLocale: locale,
      namespace: null
    }).subscribe({
      next: (res) => {
        if (res.success) {
          alert(`Auto-translation job queued for ${locale}. Job ID: ${res.data}`);
        }
      }
    });
  }

  exportLocale(locale: string): void {
    this.svc.exportTranslations(locale).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const json = JSON.stringify(res.data, null, 2);
          const blob = new Blob([json], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${locale}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }
    });
  }
}
