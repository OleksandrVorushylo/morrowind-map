import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getPlatform: vi.fn(),
  save: vi.fn(),
}));

vi.mock('@capacitor/core', () => ({
  Capacitor: { getPlatform: mocks.getPlatform },
  registerPlugin: () => ({ save: mocks.save }),
}));

import { saveNativeBackup } from './nativeBackup';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Android backup export', () => {
  it('leaves the browser download to the web implementation', async () => {
    mocks.getPlatform.mockReturnValue('web');
    expect(await saveNativeBackup('backup.json', '{}')).toBeNull();
    expect(mocks.save).not.toHaveBeenCalled();
  });

  it('passes the backup to Android and distinguishes cancellation', async () => {
    mocks.getPlatform.mockReturnValue('android');
    mocks.save.mockResolvedValueOnce({ saved: false }).mockResolvedValueOnce({ saved: true });
    expect(await saveNativeBackup('backup.json', '{"test":true}')).toBe(false);
    expect(await saveNativeBackup('backup.json', '{"test":true}')).toBe(true);
    expect(mocks.save).toHaveBeenCalledWith({ name: 'backup.json', contents: '{"test":true}' });
  });
});
