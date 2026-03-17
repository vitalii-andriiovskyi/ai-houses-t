import { InjectionToken } from "@angular/core";

export interface AppConfig {
  apiUrl: string;
  version?: string;
  // features: Record<string, boolean>;
  imagesUrl: string;
  defaultImageUrl: string;
  envRCP: boolean;
  domain: string;
  googleVerificationId: string;
  blogName: string;
  twitterName: string;
}

// Globally available configuration using providedIn
export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('app.config');