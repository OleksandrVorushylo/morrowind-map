import { Capacitor, registerPlugin } from '@capacitor/core';

interface NativeBackupPlugin {
  save(options: { name: string; contents: string }): Promise<{ saved: boolean }>;
}

const NativeBackup = registerPlugin<NativeBackupPlugin>('NativeBackup');

export async function saveNativeBackup(name: string, contents: string): Promise<boolean | null> {
  if (Capacitor.getPlatform() !== 'android') return null;
  return (await NativeBackup.save({ name, contents })).saved;
}
