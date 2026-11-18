import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { i18n } from '../i18n';
import { TransportControls } from './TransportControls';
import type { TransportCatalog } from './types';

const catalog: TransportCatalog = {
  schemaVersion: 1, datasetId: 'test', snapshotId: 'test', sourcePlugins: [],
  stops: [
    { id: 'a', name: 'Балмора', position: [0, 0], regionId: 'vvardenfell' },
    { id: 'b', name: 'Сейда Нин', position: [1, 1], regionId: 'vvardenfell' },
  ],
  routes: [{ id: 'route', from: 'a', to: 'b', mode: 'land', subtype: 'Silt strider', provider: 'Darvame', conditions: [], source: 'test' }],
  review: { excluded: [], notes: [] },
};

afterEach(async () => { cleanup(); await i18n.changeLanguage('en'); });

describe('localized transport', () => {
  it('shows translated route controls without changing route identity', async () => {
    await i18n.changeLanguage('ru');
    render(<TransportControls enabled modes={['land']} expanded={false} onToggle={vi.fn()}
      onExpandedChange={vi.fn()} onModesChange={vi.fn()} status="ready" onRetry={vi.fn()}
      catalog={catalog} selectedStopId="a" wikiUrl={null} onCopyLink={vi.fn()}
      onStopSelect={vi.fn()} onDestinationSelect={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Балмора' })).toBeVisible();
    expect(screen.getByRole('button', { name: /Сейда Нин/ })).toBeVisible();
    expect(screen.getByText(/Силт-страйдер/)).toBeVisible();
    expect(catalog.routes[0]?.id).toBe('route');
  });
});
