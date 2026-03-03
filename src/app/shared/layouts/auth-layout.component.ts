import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <router-outlet />
    </div>
  `,
  styles: [`
    .auth-layout {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-primary);
      background-image:
        radial-gradient(ellipse at 20% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(239, 68, 68, 0.06) 0%, transparent 50%);
    }
  `],
})
export class AuthLayoutComponent {}
