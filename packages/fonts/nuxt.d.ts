export interface NuxtFontsFamily {
  name: string;
  provider: 'npm';
  weights: (number | string)[];
  styles: 'normal'[];
}

export interface NuxtFontsConfig {
  processCSSVariables: false;
  npm: {
    root: string;
    remote: false;
    resolve: (id: string) => string;
  };
  families: NuxtFontsFamily[];
}

export declare function nuxtFontsConfig(): NuxtFontsConfig;
