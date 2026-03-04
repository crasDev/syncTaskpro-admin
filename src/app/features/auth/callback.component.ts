import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, filter, take } from 'rxjs';
import { UserStore } from '../../core/identity/user.store';

@Component({
  selector: 'app-callback',
  standalone: true,
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private userStore = inject(UserStore);

  ngOnInit(): void {
    combineLatest([this.auth.isLoading$, this.auth.isAuthenticated$])
      .pipe(
        filter(([loading]) => !loading),
        take(1),
      )
      .subscribe(([, isAuthenticated]) => {
        if (isAuthenticated) {
          this.userStore.loadProfile();
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}
