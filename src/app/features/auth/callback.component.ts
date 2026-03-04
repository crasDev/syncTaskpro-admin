import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, filter, take } from 'rxjs';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `
    <div class="callback">
      <div class="spinner"></div>
      <p>Signing you in...</p>
    </div>
  `,
  styles: [`
    .callback {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      background: var(--color-bg-primary, #060B14);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top: 3px solid var(--color-primary, #FF2D55);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    p {
      color: var(--color-text-muted, #4A6FA5);
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 14px;
    }
  `],
})
export class CallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    combineLatest([this.auth.isLoading$, this.auth.isAuthenticated$])
      .pipe(
        filter(([loading]) => !loading),
        take(1),
      )
      .subscribe(([, isAuthenticated]) => {
        if (isAuthenticated) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}
