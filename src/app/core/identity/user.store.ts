import { Injectable, inject, signal } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { UserProfileDto } from '@synctaskpro/contracts';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private profileService = inject(UserProfileService);

  profile = signal<UserProfileDto | null>(null);

  loadProfile(): void {
    this.profileService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.profile.set(res.data);
        }
      },
    });
  }
}
