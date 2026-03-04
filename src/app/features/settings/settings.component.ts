import { Component, inject } from '@angular/core';
import { ThemeService, ThemeScheme, BackgroundType } from '../../core/theme/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private themeService = inject(ThemeService);

  scheme = this.themeService.scheme;
  backgroundType = this.themeService.backgroundType;
  overlayIntensity = this.themeService.overlayIntensity;
  blurIntensity = this.themeService.blurIntensity;

  themes: { value: ThemeScheme; label: string }[] = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'system', label: 'System' },
  ];

  presets: { value: BackgroundType; label: string }[] = [
    { value: 'ambient', label: 'Ambient' },
    { value: 'preset-mesh', label: 'Mesh' },
    { value: 'preset-aurora', label: 'Aurora' },
    { value: 'preset-grid', label: 'Grid' },
    { value: 'preset-carbon', label: 'Carbon' },
    { value: 'preset-space', label: 'Space' },
    { value: 'preset-circuit', label: 'Circuit' },
  ];

  setTheme(scheme: ThemeScheme): void {
    this.themeService.setTheme(scheme);
  }

  setBackground(type: BackgroundType): void {
    this.themeService.setBackground(type);
  }

  onOverlayChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.themeService.setOverlayIntensity(value);
  }

  onBlurChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.themeService.setBlurIntensity(value);
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = async () => {
      await this.themeService.setCustomBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}
