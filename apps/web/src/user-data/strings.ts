import type { ProgressStatus } from '@morrowind-map/contracts';
import type { BackupImportResult } from '../storage/userData';

interface UserDataStrings {
  readonly dataToolsTitle: string;
  readonly exportJson: string;
  readonly importJson: string;
  readonly importJsonHint: string;
  readonly importing: string;
  readonly exporting: string;
  readonly backupExported: string;
  readonly fileTooLarge: string;
  readonly operationFailed: (detail: string, retryLabel: string) => string;
  readonly placeProgress: string;
  readonly status: string;
  readonly note: string;
  readonly noteSaveFailed: (detail: string) => string;
  readonly saved: string;
  readonly customMarker: string;
  readonly label: string;
  readonly save: string;
  readonly deleteMarker: string;
  readonly confirmDelete: string;
  readonly confirmDeleteAction: string;
  readonly cancel: string;
  readonly deleting: string;
  readonly deleted: string;
  readonly statuses: Readonly<Record<ProgressStatus, string>>;
  readonly backupResult: (result: BackupImportResult) => string;
}

const EN: UserDataStrings = {
  dataToolsTitle: 'Data and backups',
  exportJson: 'Download JSON backup',
  importJson: 'Import JSON backup',
  importJsonHint: 'JSON files up to 10 MB',
  importing: 'Importing…',
  exporting: 'Preparing backup…',
  backupExported: 'JSON backup downloaded.',
  fileTooLarge: 'The selected file is larger than 10 MB. Choose a smaller JSON file and try again.',
  operationFailed: (detail, retryLabel) =>
    `The operation failed: ${detail}. Select “${retryLabel}” to try again.`,
  placeProgress: 'Place progress',
  status: 'Status',
  note: 'Personal note',
  noteSaveFailed: (detail) =>
    `The note could not be saved: ${detail}. Select “Save” to try again.`,
  saved: 'Saved.',
  customMarker: 'Custom marker',
  label: 'Marker name',
  save: 'Save',
  deleteMarker: 'Delete',
  confirmDelete: 'Delete this marker? This action cannot be undone.',
  confirmDeleteAction: 'Yes, delete',
  cancel: 'Cancel',
  deleting: 'Deleting…',
  deleted: 'Marker deleted.',
  statuses: {
    unvisited: 'Unvisited',
    active: 'Active',
    visited: 'Visited',
  },
  backupResult: (result) =>
    `Backup imported: ${result.progressImported} places and ${result.markersImported} markers; ` +
    `${result.progressSkipped + result.markersSkipped} kept locally.`,
};

const RU: UserDataStrings = {
  dataToolsTitle: 'Данные и резервные копии', exportJson: 'Скачать резервную копию JSON',
  importJson: 'Импортировать резервную копию JSON', importJsonHint: 'Файлы JSON до 10 МБ',
  importing: 'Импорт…', exporting: 'Подготовка копии…', backupExported: 'Резервная копия скачана.',
  fileTooLarge: 'Размер файла превышает 10 МБ. Выберите файл меньшего размера.',
  operationFailed: (detail, retryLabel) => `Ошибка: ${detail}. Нажмите «${retryLabel}», чтобы повторить.`,
  placeProgress: 'Прогресс места', status: 'Статус', note: 'Личная заметка',
  noteSaveFailed: (detail) => `Не удалось сохранить заметку: ${detail}. Повторите сохранение.`,
  saved: 'Сохранено.', customMarker: 'Личная метка', label: 'Название метки', save: 'Сохранить',
  deleteMarker: 'Удалить', confirmDelete: 'Удалить метку? Это действие нельзя отменить.',
  confirmDeleteAction: 'Да, удалить', cancel: 'Отмена', deleting: 'Удаление…', deleted: 'Метка удалена.',
  statuses: { unvisited: 'Не посещено', active: 'В процессе', visited: 'Посещено' },
  backupResult: (result) => `Импортировано мест: ${result.progressImported}, меток: ${result.markersImported}; ` +
    `сохранено локальных записей: ${result.progressSkipped + result.markersSkipped}.`,
};

export function getUserDataStrings(locale: 'en' | 'ru'): UserDataStrings {
  return locale === 'ru' ? RU : EN;
}
