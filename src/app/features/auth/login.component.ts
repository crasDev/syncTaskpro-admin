import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-page">
      <!-- Background orbs -->
      <div class="bg-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <div class="login-content">
        <img
          src="assets/images/logo-full.png"
          alt="SyncTaskPro"
          class="admin-logo"
        />

        <div class="admin-badge">ADMIN CONSOLE</div>

        <div class="login-card">
          <h2>Authorised Access Only</h2>
          <p class="card-subtitle">
            This console is restricted to SyncTaskPro administrators.
          </p>
          <button class="login-button" (click)="login()">
            Sign in
          </button>
        </div>

        <div class="warning-strip">
          <span class="warning-icon">&#9888;</span>
          All actions in this console are logged and audited.
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      background: var(--color-bg-primary);
      position: relative;
      overflow: hidden;
    }

    .bg-orbs {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.5;
    }

    .orb-1 {
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(255, 45, 85, 0.15), transparent 70%);
      top: -50px;
      right: -100px;
      animation: drift-1 20s ease-in-out infinite;
    }

    .orb-2 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255, 45, 85, 0.1), transparent 70%);
      bottom: 10%;
      left: -50px;
      animation: drift-2 25s ease-in-out infinite;
    }

    .orb-3 {
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(204, 16, 51, 0.12), transparent 70%);
      top: 40%;
      left: 50%;
      animation: drift-3 30s ease-in-out infinite;
    }

    @keyframes drift-1 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-40px, 60px); }
    }

    @keyframes drift-2 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(50px, -40px); }
    }

    @keyframes drift-3 {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(-30px, 20px); }
      66% { transform: translate(20px, -30px); }
    }

    .login-content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .admin-logo {
      width: 100px;
      margin-bottom: 24px;
      filter: drop-shadow(0 0 20px #FF2D55) drop-shadow(0 0 40px rgba(255, 45, 85, 0.3));
      animation: float 4s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .admin-badge {
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--color-primary);
      text-shadow: 0 0 30px var(--color-accent-glow);
      margin-bottom: 40px;
    }

    .login-card {
      width: 420px;
      max-width: 100%;
      background: var(--color-glass-bg);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--color-glass-border);
      border-radius: var(--glass-radius-lg);
      box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 var(--color-glass-highlight);
      padding: 40px;
      text-align: center;
    }

    .login-card h2 {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 12px;
    }

    .card-subtitle {
      font-size: 14px;
      color: var(--color-text-muted);
      margin-bottom: 32px;
      line-height: 1.5;
    }

    .login-button {
      width: 100%;
      padding: 14px;
      background: var(--color-glass-bg);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--color-primary);
      border-radius: 50px;
      color: var(--color-primary);
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 0 20px var(--color-accent-glow);

      &:hover {
        background: var(--color-accent-glow);
        box-shadow: 0 0 40px var(--color-accent-glow);
        transform: translateY(-1px);
      }
    }

    .warning-strip {
      margin-top: 32px;
      padding: 12px 20px;
      background: rgba(255, 45, 85, 0.05);
      border: 1px solid rgba(255, 45, 85, 0.1);
      border-radius: var(--glass-radius-sm);
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .warning-icon {
      font-size: 14px;
      color: var(--color-warning);
    }
  `],
})
export class LoginComponent {
  private auth = inject(AuthService);

  login(): void {
    this.auth.loginWithRedirect();
  }
}
