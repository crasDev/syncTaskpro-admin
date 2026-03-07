import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiResponse,
  TranslationEntryDto,
  TranslationCoverageDto,
  UpsertTranslationCommand,
  ImportTranslationsCommand,
  AutoTranslateCommand,
} from '@synctaskpro/contracts';

const env = (window as any).__env || {};
const API = `${env.API_URL || environment.apiUrl}/api/admin/translations`;

@Injectable({ providedIn: 'root' })
export class AdminTranslationService {
  private http = inject(HttpClient);

  getKeys(locale: string, ns?: string): Observable<ApiResponse<TranslationEntryDto[]>> {
    let params = new HttpParams();
    if (ns) params = params.set('ns', ns);
    return this.http.get<ApiResponse<TranslationEntryDto[]>>(`${API}/keys/${locale}`, { params });
  }

  getCoverage(): Observable<ApiResponse<TranslationCoverageDto[]>> {
    return this.http.get<ApiResponse<TranslationCoverageDto[]>>(`${API}/coverage`);
  }

  upsertKey(command: UpsertTranslationCommand): Observable<ApiResponse<TranslationEntryDto>> {
    return this.http.put<ApiResponse<TranslationEntryDto>>(`${API}/keys`, command);
  }

  importTranslations(command: ImportTranslationsCommand): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${API}/import`, command);
  }

  exportTranslations(locale: string): Observable<ApiResponse<Record<string, string>>> {
    return this.http.post<ApiResponse<Record<string, string>>>(`${API}/export/${locale}`, {});
  }

  triggerAutoTranslate(command: AutoTranslateCommand): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${API}/auto-translate`, command);
  }
}
