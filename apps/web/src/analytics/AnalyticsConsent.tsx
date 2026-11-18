import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  disableGoogleAnalytics,
  enableGoogleAnalytics,
  readAnalyticsConsent,
  storeAnalyticsConsent,
  type AnalyticsConsent,
} from './googleAnalytics';

interface AnalyticsConsentBannerProps {
  readonly showSettings?: boolean;
}

export function AnalyticsConsentBanner({ showSettings = true }: AnalyticsConsentBannerProps) {
  const { i18n } = useTranslation();
  const ru = i18n.resolvedLanguage === 'ru';
  const [consent, setConsent] = useState<AnalyticsConsent | null>(readAnalyticsConsent);
  const [isOpen, setIsOpen] = useState(consent === null);
  const bannerRef = useRef<HTMLElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const shouldFocusBannerRef = useRef(false);
  const shouldRestoreFocusRef = useRef(false);

  useEffect(() => {
    if (consent === 'granted') {
      enableGoogleAnalytics();
    }
  }, [consent]);

  useEffect(() => {
    const syncConsent = (event: StorageEvent) => {
      if (event.key !== null && event.key !== ANALYTICS_CONSENT_STORAGE_KEY) {
        return;
      }

      const nextConsent = readAnalyticsConsent();
      if (nextConsent !== 'granted') {
        disableGoogleAnalytics();
      }
      setConsent(nextConsent);
      setIsOpen(nextConsent === null);
    };

    window.addEventListener('storage', syncConsent);
    return () => window.removeEventListener('storage', syncConsent);
  }, []);

  useEffect(() => {
    if (isOpen && shouldFocusBannerRef.current) {
      bannerRef.current?.focus();
      shouldFocusBannerRef.current = false;
      return;
    }

    if (!isOpen && shouldRestoreFocusRef.current && showSettings) {
      const settingsButton = settingsButtonRef.current;
      if (settingsButton) {
        settingsButton.focus();
        shouldRestoreFocusRef.current = false;
      }
      return;
    }

    if (!isOpen && shouldRestoreFocusRef.current && !showSettings) {
      const focusMap = () => {
        const target = document.querySelector<HTMLElement>(
          '.dataset-map-screen .back-button, .map-canvas',
        );
        if (!target) {
          return false;
        }
        target.focus({ preventScroll: true });
        shouldRestoreFocusRef.current = false;
        return true;
      };

      if (focusMap()) {
        return;
      }

      document.getElementById('landing-heading')?.focus({ preventScroll: true });
      const observer = new MutationObserver(() => {
        if (focusMap()) {
          observer.disconnect();
          window.clearTimeout(timeoutId);
        }
      });
      observer.observe(document.getElementById('root') ?? document.body, {
        childList: true,
        subtree: true,
      });
      const timeoutId = window.setTimeout(() => {
        observer.disconnect();
        const fallback = document.querySelector<HTMLElement>(
          '.error-panel button, #landing-heading',
        );
        fallback?.focus({ preventScroll: true });
        shouldRestoreFocusRef.current = false;
      }, 10_000);
      return () => {
        observer.disconnect();
        window.clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [isOpen, showSettings]);

  const chooseConsent = (nextConsent: AnalyticsConsent) => {
    storeAnalyticsConsent(nextConsent);
    if (nextConsent === 'denied') {
      disableGoogleAnalytics();
    }
    shouldRestoreFocusRef.current = true;
    setConsent(nextConsent);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <aside
          ref={bannerRef}
          className="analytics-consent-banner"
          aria-labelledby="analytics-consent-title"
          tabIndex={-1}
        >
          <div className="analytics-consent-banner__copy">
            <h2 id="analytics-consent-title">{ru ? 'Файлы cookie аналитики' : 'Analytics cookies'}</h2>
            <p>
              {ru ? 'Ваш прогресс, заметки и метки остаются на этом устройстве. С вашего согласия Google Analytics получает данные об использовании и устройстве и может сохранять файлы cookie аналитики. Хранение рекламных данных отключено.' : 'Your map progress, notes, and markers stay on this device. If you agree, Google Analytics receives usage and device data and may set analytics cookies. Advertising storage stays disabled.'}{' '}
              <a
                href="https://business.safety.google/privacy/"
                target="_blank"
                rel="noreferrer"
              >
                {ru ? 'Как Google использует данные' : 'How Google uses data'}
              </a>
              {ru ? '. Изменить выбор можно в настройках аналитики.' : '. You can change your choice later in Analytics settings.'}
            </p>
          </div>
          <div className="analytics-consent-banner__actions">
            <button type="button" onClick={() => chooseConsent('denied')}>
              {ru ? 'Отклонить' : 'Reject'}
            </button>
            <button type="button" onClick={() => chooseConsent('granted')}>
              {ru ? 'Разрешить аналитику' : 'Accept analytics'}
            </button>
          </div>
        </aside>
      ) : consent !== null && showSettings ? (
        <button
          ref={settingsButtonRef}
          className="analytics-settings-button"
          type="button"
          onClick={() => {
            shouldFocusBannerRef.current = true;
            shouldRestoreFocusRef.current = true;
            setIsOpen(true);
          }}
        >
          {ru ? 'Настройки аналитики' : 'Analytics settings'}
        </button>
      ) : null}
    </>
  );
}
