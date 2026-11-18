import hashlib
import json
import zipfile
from pathlib import Path

from tools.deployment.dataset_packages import read_tile_sets

root = Path(__file__).resolve().parents[2]
public = root / 'apps/web/public'
apk = root / 'android/app/build/outputs/apk/debug/Morrowind-Map.apk'
with zipfile.ZipFile(apk) as archive:
    index = json.loads(archive.read('assets/public/datasets/index.json'))
    if len(index['datasets']) != 5:
        raise SystemExit('APK must contain five maps.')
    for tile_set in read_tile_sets(public_root=public):
        for tile in tile_set.tiles:
            name = (Path('assets/public/datasets/generated') / tile_set.generated_path / tile.path).as_posix()
            info = archive.getinfo(name)
            if info.file_size != tile.byte_count:
                raise SystemExit(f'APK tile has the wrong size: {name}')
            digest_state = hashlib.sha256()
            with archive.open(info) as data:
                for block in iter(lambda: data.read(1024 * 1024), b''):
                    digest_state.update(block)
            digest = digest_state.hexdigest()
            if digest != tile.sha256:
                raise SystemExit(f'APK tile hash does not match: {name}')
        print(f'{tile_set.dataset_id}: {len(tile_set.tiles)} verified tiles', flush=True)
    for dataset_id in ('original-goty-hd', 'poison-song-26.08', 'abecean-shores-26.09', 'dragonstar-26.09'):
        name = f'local-localization/{dataset_id}.json'
        if json.loads(archive.read('assets/public/' + name)) != json.loads((public / name).read_text()):
            raise SystemExit(f'APK Russian catalog does not match: {dataset_id}')
print(f'APK verified: {apk}')
