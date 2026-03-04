import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserStore } from '../../core/identity/user.store';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent implements OnInit {
  private auth = inject(AuthService);
  userStore = inject(UserStore);

  ngOnInit(): void {
    if (!this.userStore.profile()) {
      this.userStore.loadProfile();
    }
  }

  get userInitials(): string {
    const p = this.userStore.profile();
    if (!p) return 'A';
    return (p.firstName?.[0] ?? '') + (p.lastName?.[0] ?? '');
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
