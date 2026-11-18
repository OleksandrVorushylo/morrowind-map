import type VectorSource from 'ol/source/Vector.js';
import type { PlaceView } from '../data/placeSearch';

export function syncPlaceLabelViews(source: VectorSource, views: ReadonlyMap<string, PlaceView>): void {
  for (const feature of source.getFeatures()) {
    const id = feature.get('placeId') as string;
    const view = views.get(id);
    if (view) feature.set('placeView', view, true);
  }
}
