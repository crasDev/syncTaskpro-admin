import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiResponse,
  PagedResult,
  CompanyDto,
} from '@synctaskpro/contracts';

const env = (window as any).__env || {};
const API = `${env.API_URL || environment.apiUrl}/api/admin/companies`;

@Injectable({ providedIn: 'root' })
export class AdminCompanyService {
  private http = inject(HttpClient);

  getCompanies(
    page: number,
    pageSize: number,
    search?: string,
  ): Observable<ApiResponse<PagedResult<CompanyDto>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ApiResponse<PagedResult<CompanyDto>>>(API, {
      params,
    });
  }

  getCompany(id: string): Observable<ApiResponse<CompanyDto>> {
    return this.http.get<ApiResponse<CompanyDto>>(`${API}/${id}`);
  }
}
