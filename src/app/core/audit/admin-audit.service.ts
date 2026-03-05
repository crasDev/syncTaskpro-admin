import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PagedResult, AuditEntryDto, AuditCategory, AuditSeverity } from '@synctaskpro/contracts';

const env = (window as any).__env || {};
const API = `${env.API_URL || environment.apiUrl}/api/admin/audit`;

@Injectable({ providedIn: 'root' })
export class AdminAuditService {
  private http = inject(HttpClient);

  getAuditLog(
    page = 1,
    pageSize = 50,
    category?: AuditCategory,
    severity?: AuditSeverity,
  ): Observable<ApiResponse<PagedResult<AuditEntryDto>>> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (category !== undefined) params = params.set('category', category);
    if (severity !== undefined) params = params.set('severity', severity);
    return this.http.get<ApiResponse<PagedResult<AuditEntryDto>>>(API, { params });
  }
}
