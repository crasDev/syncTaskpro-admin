import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, UserProfileDto } from '@synctaskpro/contracts';

const env = (window as any).__env || {};
const API = `${env.API_URL || environment.apiUrl}/api/identity/profiles`;

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private http = inject(HttpClient);

  getMyProfile(): Observable<ApiResponse<UserProfileDto>> {
    return this.http.get<ApiResponse<UserProfileDto>>(`${API}/me`);
  }
}
