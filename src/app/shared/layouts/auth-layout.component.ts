import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <div class="bg-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
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
  `],
})
export class AuthLayoutComponent {}
