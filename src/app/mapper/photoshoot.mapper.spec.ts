import {PhotoshootResponse} from '../model/photoshoot.response';
import {PhotoshootDetailsResponse} from '../model/photoshoot-details.response';
import {async} from '@angular/core/testing';
import {photoshootMapper} from './photoshoot.mapper';
import {PhotoshootData} from '../model/photoshoot.model';

describe('photoshootMapper', () => {

  let photoshoot: PhotoshootResponse;
  let photoshootDetails: PhotoshootDetailsResponse;


  beforeEach(async(() => {
    photoshoot = {id: 3, day_of_the_week: 'WEDNESDAY', type: 'Real Estate', client_id: 90, photoshoot_id: 3};
    photoshootDetails = {id: 3, title: 'Bax', number_of_photos: 344, country: 'China', package: '3XL'};
  }));

  it('should map data if you pass valued obj', () => {
    const expectedData = new PhotoshootData(3, 'WEDNESDAY', 'Real Estate', 90, 344);

    const actualData = photoshootMapper(photoshoot, photoshootDetails);

    expect(actualData).toEqual(expectedData);
  });

  it('should return null if you pass null obj', () => {
    const expectedData = null;

    const actualData = photoshootMapper(null, null);

    expect(actualData).toEqual(expectedData);
  });
});
