import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorSource from 'ol/source/Vector.js';
import { describe, expect, it } from 'vitest';
import type { PlaceView } from '../data/placeSearch';
import { syncPlaceLabelViews } from './placeLabelViews';

const english = { id: 'balmora', name: 'Balmora' } as PlaceView;
const russian = { ...english, name: 'Балмора' };

describe('map label views', () => {
  it('updates the existing feature for both rendering and hit detection', () => {
    const geometry = new Point([10, 20]);
    const feature = new Feature({ geometry, placeId: english.id, placeView: english });
    const source = new VectorSource({ features: [feature] });

    syncPlaceLabelViews(source, new Map([[russian.id, russian]]));
    expect(source.getFeatures()).toEqual([feature]);
    expect(feature.getGeometry()).toBe(geometry);
    expect(feature.get('placeView')).toBe(russian);

    syncPlaceLabelViews(source, new Map([[english.id, english]]));
    expect(feature.get('placeView')).toBe(english);
    expect(geometry.getCoordinates()).toEqual([10, 20]);
  });
});
