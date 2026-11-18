import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { PixelIcon } from './PixelIcon';
import { StatusMark } from './StatusMark';

interface MapSettingsProps {
  readonly colorblind: boolean;
  readonly onColorblindChange: (enabled: boolean) => boolean;
}

export function MapSettings({ colorblind, onColorblindChange }: MapSettingsProps) {
  const { i18n } = useTranslation();
  const label = (en: string, ru: string) => i18n.resolvedLanguage === 'ru' ? ru : en;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  return (
    <>
      <button
        className="map-settings-trigger"
        type="button"
        aria-label={label('Map settings', 'Настройки карты')}
        title={label('Map settings', 'Настройки карты')}
        aria-haspopup="dialog"
        aria-controls="map-settings-panel"
        aria-expanded={isOpen}
        onClick={() => {
          dialogRef.current?.showModal();
          setIsOpen(true);
        }}
      >
        <PixelIcon name="settings" />
      </button>
      <dialog
        ref={dialogRef}
        id="map-settings-panel"
        className="landing-contact-panel map-settings-panel"
        aria-labelledby="map-settings-title"
        onClose={() => setIsOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
          }
        }}
      >
        <button
          className="landing-contact-panel__close"
          type="button"
          aria-label={label('Close map settings', 'Закрыть настройки карты')}
          onClick={() => dialogRef.current?.close()}
        >
          <PixelIcon name="close" />
        </button>
        <h2 id="map-settings-title">{label('Map settings', 'Настройки карты')}</h2>
        <label className="map-settings-option">
          <input
            type="checkbox"
            checked={colorblind}
            aria-describedby="map-settings-color-description"
            onChange={(event) => {
              setSaveFailed(!onColorblindChange(event.currentTarget.checked));
            }}
          />
          <span>{label('Enable colorblind-friendly mode', 'Режим для людей с нарушением цветовосприятия')}</span>
        </label>
        <p id="map-settings-color-description">
          {label('Distinguish places and personal markers by both color and shape. Applies immediately to all maps.', 'Места и личные метки различаются по цвету и форме. Настройка сразу применяется ко всем картам.')}
        </p>
        <div className="map-settings-preview" role="group" aria-label={label('Status color preview', 'Предпросмотр статусов')}>
          <span><StatusMark kind="unvisited" />{label('Unvisited', 'Не посещено')}</span>
          <span><StatusMark kind="active" />{label('Active', 'В процессе')}</span>
          <span><StatusMark kind="visited" />{label('Visited', 'Посещено')}</span>
          <span><StatusMark kind="custom" />{label('Personal marker', 'Личная метка')}</span>
        </div>
        {saveFailed ? (
          <p role="status">{label('Colors changed for this session. Your browser could not save the preference.', 'Цвета изменены для текущего сеанса. Браузеру не удалось сохранить настройку.')}</p>
        ) : null}
      </dialog>
    </>
  );
}
