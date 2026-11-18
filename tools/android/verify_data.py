import json
from pathlib import Path

from tools.deployment.dataset_packages import _read_lock, read_tile_sets, validate_lock
from tools.deployment.download_datasets import _installed

root = Path(__file__).resolve().parents[2]
public = root / 'apps/web/public'
tile_sets = read_tile_sets(public_root=public)
validate_lock(_read_lock(root / 'config/dataset-releases.lock.json'), tile_sets)
if len(tile_sets) != 5:
    raise SystemExit('Expected five complete maps.')
for tile_set in tile_sets:
    if not _installed(tile_set, public / 'datasets/generated'):
        raise SystemExit(f'Missing or invalid map data: {tile_set.dataset_id}. Run pnpm datasets:download.')

index = json.loads((public / 'datasets/index.json').read_text())
required = {'original-goty-hd', 'poison-song-26.08', 'abecean-shores-26.09', 'dragonstar-26.09'}
for entry in index['datasets']:
    dataset_id = entry['datasetId']
    if dataset_id not in required:
        continue
    manifest = json.loads((public / entry['manifestUrl'].lstrip('/')).read_text())
    locale = json.loads((public / 'local-localization' / f'{dataset_id}.json').read_text())
    english_url = next(item['artifact']['url'] for item in manifest['artifacts']['locales'] if item['locale'] == 'en')
    english = json.loads((public / english_url.lstrip('/')).read_text())
    if locale['datasetId'] != dataset_id or locale['snapshotId'] != manifest['snapshotId']:
        raise SystemExit(f'Russian names do not match the current map: {dataset_id}.')
    if set(locale['names']) != {place['placeId'] for place in english['places']}:
        raise SystemExit(f'Russian names do not cover the full catalog: {dataset_id}.')
    required.remove(dataset_id)
if required:
    raise SystemExit('Missing Russian catalogs: ' + ', '.join(sorted(required)))
print('Verified five complete maps and four Russian catalogs.')
