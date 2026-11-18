import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      map: {
        versions: 'Back to maps',
        dataMissing: 'DATA MISSING', dataInvalid: 'DATA INVALID', dataError: 'DATA ERROR',
        modLink: 'View mod on Nexus Mods (opens in a new tab)', markerLegend: 'Marker legend',
        keyboardInstructions: 'Use arrow keys to pan the map and plus or minus to zoom. Press M to open the next personal marker.',
        loading: 'Opening the map dataset…',
        loadingSlow: 'Opening the map dataset… The catalog is taking longer than usual.',
        loadError: 'The map dataset could not be opened',
        missingData: 'This map has not been published locally yet',
        invalidData: 'This published map data is inconsistent',
        retry: 'Retry',
        retrying: 'Retrying…',
        retrySlow: 'The retry is still in progress. Your map URL and view are preserved.',
        searchLabel: 'Find a place',
        searchPlaceholder: 'Balmora, tomb, guild…',
        regions: 'Map section',
        allRegions: 'All',
        filters: 'Filters',
        filterSummaryOne: '1 active',
        filterSummaryMany: '{{active}} active',
        typeFilters: 'Place types',
        statusFilters: 'Progress status',
        resetFilters: 'Reset filters',
        allTypes: 'Any type',
        allStatuses: 'Any status',
        vvardenfell: 'Vvardenfell',
        solstheim: 'Solstheim',
        noResults: 'No places match this query.',
        clearSearch: 'Clear search',
        noFilteredPlaces: 'No catalog places match these filters. Reset filters to restore the index.',
        noExteriorContent: 'This dataset contains no exterior places to display. Choose another version.',
        noPlacesAtZoom: 'No places are visible at this zoom level. Zoom in to reveal more locations.',
        progressFilterUnavailable: 'Progress filters are paused until local data is available again.',
        mapAria: 'Interactive map in TES3 world coordinates',
        basemapError: 'Map tiles failed to load: {{count}}',
        basemapPartialError: 'Map tiles failed to load in some areas: {{count}}. Loaded areas remain available.',
        basemapFullError: 'Map tiles failed to load in the visible area: {{count}}.',
        retryFailedTiles: 'Retry failed tiles',
        basemapMissing: 'No map tile exists at this position and zoom level.',
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
        controls: 'Map controls',
        unvisited: 'Unvisited',
        active: 'Active',
        visited: 'Visited',
        personalMarker: 'Personal marker',
        addMarker: 'Add personal marker',
        cancelMarker: 'Cancel marker placement',
        placeMarkerHint: 'Click the map, or focus it and press Enter, to place a personal marker',
        retryMarker: 'Retry marker',
        localDataLoading: 'Opening the local progress log…',
        localDataError: 'Local progress is unavailable',
        localDataReadOnly: 'The map remains available in read-only mode. Your existing records are unchanged.',
        localDataConflict: 'Local progress belongs to another snapshot',
        localDataPreserved: 'Your records were preserved. Export them from the header or choose another map.',
        markerLabel: 'Marker name',
        markerNote: 'Marker note',
        saveMarker: 'Save marker',
        deleteMarker: 'Delete marker',
        closeMarker: 'Close personal marker card',
        closeCard: 'Close place card',
        copyPlaceLink: 'Copy link to this place',
        placeLinkCopied: 'Link copied.',
        placeLinkCopyFailed: 'Could not copy the link. Try again.',
        zoom: 'Map zoom',
      },
      placeType: {
        settlement: 'Settlement',
        guild: 'Guild',
        temple: 'Temple',
        cave: 'Cave',
        mine: 'Mine',
        ship: 'Ship',
        shrine: 'Shrine',
        'ancestral-tomb': 'Ancestral tomb',
        stronghold: 'Stronghold',
        'dwemer-ruin': 'Dwemer ruin',
        house: 'House',
        shop: 'Shop',
        landmark: 'Landmark',
        other: 'Other',
      },
    },
  },
  ru: {
    translation: {
      map: {
        versions: 'К выбору карты', dataMissing: 'ДАННЫЕ ОТСУТСТВУЮТ', dataInvalid: 'ОШИБКА ДАННЫХ', dataError: 'ОШИБКА ДАННЫХ',
        modLink: 'Открыть мод на Nexus Mods в новой вкладке', markerLegend: 'Обозначения меток',
        keyboardInstructions: 'Используйте стрелки для перемещения по карте, плюс и минус для изменения масштаба. Нажмите M, чтобы открыть следующую личную метку.',
        loading: 'Открываем карту…',
        loadingSlow: 'Открываем карту… Загрузка каталога занимает больше времени.',
        loadError: 'Не удалось открыть данные карты', missingData: 'Эта карта ещё не установлена локально',
        invalidData: 'Данные карты содержат ошибки', retry: 'Повторить', retrying: 'Повторяем…',
        retrySlow: 'Повторная загрузка продолжается. Ссылка и положение карты сохранены.',
        searchLabel: 'Найти место', searchPlaceholder: 'Балмора, гробница, гильдия…',
        regions: 'Часть карты', allRegions: 'Все', filters: 'Фильтры', filterSummaryOne: '1 активен',
        filterSummaryMany: 'Активно: {{active}}', typeFilters: 'Типы мест', statusFilters: 'Статус посещения',
        resetFilters: 'Сбросить фильтры', allTypes: 'Все типы', allStatuses: 'Все статусы',
        vvardenfell: 'Вварденфелл', solstheim: 'Солстхейм', noResults: 'Места не найдены.',
        clearSearch: 'Очистить поиск', noFilteredPlaces: 'Нет мест, соответствующих фильтрам. Сбросьте фильтры.',
        noExteriorContent: 'В этом наборе нет мест на открытой карте. Выберите другую версию.',
        noPlacesAtZoom: 'На этом масштабе места не видны. Увеличьте карту.',
        progressFilterUnavailable: 'Фильтры прогресса недоступны до восстановления локальных данных.',
        mapAria: 'Интерактивная карта в координатах мира TES3', basemapError: 'Не удалось загрузить фрагменты карты: {{count}}',
        basemapPartialError: 'Не удалось загрузить некоторые фрагменты карты: {{count}}. Загруженные области доступны.',
        basemapFullError: 'Не удалось загрузить фрагменты видимой области: {{count}}.',
        retryFailedTiles: 'Повторить загрузку', basemapMissing: 'В этой точке и на этом масштабе нет фрагмента карты.',
        zoomIn: 'Увеличить', zoomOut: 'Уменьшить', controls: 'Управление картой',
        unvisited: 'Не посещено', active: 'В процессе', visited: 'Посещено', personalMarker: 'Личная метка',
        addMarker: 'Добавить личную метку', cancelMarker: 'Отменить размещение метки',
        placeMarkerHint: 'Нажмите на карту или выберите её и нажмите Enter, чтобы поставить метку',
        retryMarker: 'Повторить', localDataLoading: 'Открываем журнал прогресса…',
        localDataError: 'Локальный прогресс недоступен', localDataReadOnly: 'Карта доступна только для чтения. Ваши записи не изменены.',
        localDataConflict: 'Локальный прогресс относится к другой версии карты',
        localDataPreserved: 'Ваши записи сохранены. Экспортируйте их или выберите другую карту.',
        markerLabel: 'Название метки', markerNote: 'Заметка к метке', saveMarker: 'Сохранить метку',
        deleteMarker: 'Удалить метку', closeMarker: 'Закрыть карточку метки', closeCard: 'Закрыть карточку места',
        copyPlaceLink: 'Копировать ссылку на место', placeLinkCopied: 'Ссылка скопирована.',
        placeLinkCopyFailed: 'Не удалось скопировать ссылку. Попробуйте ещё раз.', zoom: 'Масштаб карты',
      },
      placeType: {
        settlement: 'Поселение', guild: 'Гильдия', temple: 'Храм', cave: 'Пещера', mine: 'Шахта',
        ship: 'Корабль', shrine: 'Святилище', 'ancestral-tomb': 'Родовая гробница', stronghold: 'Крепость',
        'dwemer-ruin': 'Двемерские руины', house: 'Дом', shop: 'Магазин', landmark: 'Ориентир', other: 'Другое',
      },
    },
  },
} as const;

function initialLanguage(): 'ru' | 'en' {
  try {
    const saved = localStorage.getItem('morrowind-map:language');
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
  }
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  interpolation: { escapeValue: false },
});

document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  try {
    localStorage.setItem('morrowind-map:language', language);
  } catch {
    return;
  }
});

export { i18n };
