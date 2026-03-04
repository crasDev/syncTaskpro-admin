import { Injectable, signal } from '@angular/core';
import { ImageStorageService } from '../storage/image-storage.service';

export type ThemeScheme = 'dark' | 'light' | 'system';
export type BackgroundType = 'ambient' | 'custom' | 'preset-mesh' | 'preset-aurora' | 'preset-grid' | 'preset-carbon' | 'preset-space' | 'preset-circuit';

const STORAGE_KEYS = {
  theme: 'stp_admin_theme',
  bgType: 'stp_admin_bg_type',
  bgOverlay: 'stp_admin_bg_overlay',
  bgBlur: 'stp_admin_bg_blur',
} as const;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

  readonly scheme = signal<ThemeScheme>(this.loadScheme());
  readonly backgroundType = signal<BackgroundType>(this.loadBgType());
  readonly overlayIntensity = signal<number>(this.loadNumber(STORAGE_KEYS.bgOverlay, 0.6));
  readonly blurIntensity = signal<number>(this.loadNumber(STORAGE_KEYS.bgBlur, 0));

  constructor(private imageStorage: ImageStorageService) {
    this.applyScheme(this.scheme());
    this.applyBackground(this.backgroundType());
    this.restoreCustomImage();

    this.mediaQuery.addEventListener('change', () => {
      if (this.scheme() === 'system') {
        this.applyResolvedScheme();
      }
    });
  }

  setTheme(scheme: ThemeScheme): void {
    this.scheme.set(scheme);
    localStorage.setItem(STORAGE_KEYS.theme, scheme);
    this.applyScheme(scheme);
  }

  setBackground(type: BackgroundType): void {
    this.backgroundType.set(type);
    localStorage.setItem(STORAGE_KEYS.bgType, type);
    this.applyBackground(type);
  }

  async setCustomBackgroundImage(dataUrl: string): Promise<void> {
    await this.imageStorage.saveBackgroundImage(dataUrl);
    document.body.style.setProperty('--bg-custom-image', `url(${dataUrl})`);
    this.setBackground('custom');
  }

  setOverlayIntensity(value: number): void {
    this.overlayIntensity.set(value);
    localStorage.setItem(STORAGE_KEYS.bgOverlay, String(value));
    document.body.style.setProperty('--bg-overlay', String(value));
  }

  setBlurIntensity(value: number): void {
    this.blurIntensity.set(value);
    localStorage.setItem(STORAGE_KEYS.bgBlur, String(value));
    document.body.style.setProperty('--bg-blur', `${value}px`);
  }

  private applyScheme(scheme: ThemeScheme): void {
    if (scheme === 'system') {
      this.applyResolvedScheme();
    } else {
      document.body.classList.toggle('theme-light', scheme === 'light');
    }
  }

  private applyResolvedScheme(): void {
    document.body.classList.toggle('theme-light', this.mediaQuery.matches);
  }

  private applyBackground(type: BackgroundType): void {
    const presets = ['bg-preset-mesh', 'bg-preset-aurora', 'bg-preset-grid', 'bg-preset-carbon', 'bg-preset-space', 'bg-preset-circuit'];
    document.body.classList.remove('bg-custom-image', ...presets);

    if (type === 'custom') {
      document.body.classList.add('bg-custom-image');
      document.body.style.setProperty('--bg-overlay', String(this.overlayIntensity()));
      document.body.style.setProperty('--bg-blur', `${this.blurIntensity()}px`);
    } else if (type.startsWith('preset-')) {
      document.body.classList.add(`bg-${type}`);
    }
  }

  private async restoreCustomImage(): Promise<void> {
    if (this.backgroundType() === 'custom') {
      const image = await this.imageStorage.getBackgroundImage();
      if (image) {
        document.body.style.setProperty('--bg-custom-image', `url(${image})`);
        document.body.style.setProperty('--bg-overlay', String(this.overlayIntensity()));
        document.body.style.setProperty('--bg-blur', `${this.blurIntensity()}px`);
      }
    }
  }

  private loadScheme(): ThemeScheme {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    return (stored === 'dark' || stored === 'light' || stored === 'system') ? stored : 'dark';
  }

  private loadBgType(): BackgroundType {
    const stored = localStorage.getItem(STORAGE_KEYS.bgType);
    const valid: BackgroundType[] = ['ambient', 'custom', 'preset-mesh', 'preset-aurora', 'preset-grid', 'preset-carbon', 'preset-space', 'preset-circuit'];
    return valid.includes(stored as BackgroundType) ? stored as BackgroundType : 'ambient';
  }

  private loadNumber(key: string, fallback: number): number {
    const stored = localStorage.getItem(key);
    return stored !== null ? parseFloat(stored) : fallback;
  }
}
