import { describe, it, expect } from 'vitest';
import { normalizeLocale, t } from './i18n';

describe('I18n Utilities', () => {
  describe('normalizeLocale', () => {
    it('should default to "en" for null/undefined/empty', () => {
      expect(normalizeLocale(null)).toBe('en');
      expect(normalizeLocale(undefined)).toBe('en');
      expect(normalizeLocale('')).toBe('en');
    });

    it('should return "id" for any input starting with "id"', () => {
      expect(normalizeLocale('id')).toBe('id');
      expect(normalizeLocale('ID')).toBe('id');
      expect(normalizeLocale('id-ID')).toBe('id');
    });

    it('should return "en" for other inputs', () => {
      expect(normalizeLocale('fr')).toBe('en');
      expect(normalizeLocale('en-US')).toBe('en');
    });
  });

  describe('t (Translation Accessor)', () => {
    it('should return English dictionary for "en"', () => {
      const dict = t('en');
      expect(dict.nav.products).toBe('Products');
    });

    it('should return Indonesian dictionary for "id"', () => {
      const dict = t('id');
      expect(dict.nav.products).toBe('Produk');
    });
  });
});
