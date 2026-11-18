import { afterEach, describe, expect, it } from 'vitest';
import { i18n } from './i18n';

afterEach(async () => {
  await i18n.changeLanguage('en');
  localStorage.removeItem('morrowind-map:language');
});

describe('interface language', () => {
  it('changes translations and saves the language', async () => {
    await i18n.changeLanguage('ru');
    expect(i18n.t('map.searchLabel')).toBe('Найти место');
    expect(document.documentElement.lang).toBe('ru');
    expect(localStorage.getItem('morrowind-map:language')).toBe('ru');
  });

  it('falls back to English for a missing translation', async () => {
    await i18n.changeLanguage('ru');
    i18n.addResource('en', 'translation', 'test.fallback', 'English fallback');
    expect(i18n.t('test.fallback')).toBe('English fallback');
    i18n.removeResourceBundle('en', 'test');
  });
});
