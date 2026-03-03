import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">S</div>
        <h1>SyncTaskPro Admin</h1>
        <p>Super admin access only</p>
      </div>
      <button class="login-button" (click)="login()">
        Sign in with Auth0
      </button>
      <p class="login-footer">
        Secure login powered by Auth0
      </p>
    </div>
  `,
  styles: [`
    .login-card {
      width: 400px;
      background: var(--color-glass-bg);
      backdrop-filter: var(--blur-glass);
      -webkit-backdrop-filter: var(--blur-glass);
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-xl);
      padding: 48px 40px;
      text-align: center;
    }

    .login-header {
      margin-bottom: 32px;
    }

    .login-logo {
      width: 56px;
      height: 56px;
      background: var(--color-accent);
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 800;
      color: white;
      margin-bottom: 20px;
      box-shadow: 0 0 40px var(--color-accent-glow);
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 8px;
    }

    p {
      color: var(--color-text-muted);
      font-size: 14px;
    }

    .login-button {
      width: 100%;
      padding: 14px;
      background: var(--color-accent);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 0 20px var(--color-accent-glow);

      &:hover {
        background: var(--color-accent-hover);
        box-shadow: 0 0 30px var(--color-accent-glow);
        transform: translateY(-1px);
      }
    }

    .login-footer {
      margin-top: 24px;
      font-size: 12px;
      color: var(--color-text-muted);
    }
  `],
})
export class LoginComponent {
  private auth = inject(AuthService);

  login(): void {
    this.auth.loginWithRedirect();
  }
}
