import { TranslationMap } from '../types';

export function getNestedValue(obj: any, path: string): any {
  if (!obj || typeof obj !== 'object') return undefined;
  
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }
  
  return current;
}

export function translate(
  translations: TranslationMap | undefined,
  key: string,
  replacements?: Record<string, string | number>,
  fallback?: string
): string {
  let val: any = undefined;

  if (translations) {
    // Try exact lookup first (e.g., "menu.title" from translations.menu.title)
    val = getNestedValue(translations, key);
  }

  // If not found, use fallback or the key itself
  if (val === undefined || val === null) {
    if (fallback !== undefined) {
      val = fallback;
    } else {
      // Return the last part of key formatted nicely as fallback
      const segments = key.split('.');
      const last = segments[segments.length - 1];
      val = last.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }
  }

  let result = String(val);

  // Parameter replacement for ":param" or "{param}"
  if (replacements && typeof replacements === 'object') {
    Object.entries(replacements).forEach(([k, v]) => {
      result = result.replace(new RegExp(`:${k}`, 'g'), String(v));
      result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    });
  }

  return result;
}
