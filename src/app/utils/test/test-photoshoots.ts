import {PhotoshootResponse} from '../../model/photoshoot.response';
import {PhotoshootDetailsResponse} from '../../model/photoshoot-details.response';
import {PhotoshootData} from '../../model/photoshoot.model';

export function getPhotoshoots(): Array<PhotoshootResponse> {
  return [
    {id: 1, day_of_the_week: 'FRIDAY', type: 'Real Estate', client_id: 71, photoshoot_id: 1},
    {id: 2, day_of_the_week: 'TUESDAY', type: 'Food', client_id: 96, photoshoot_id: 2},
    {id: 3, day_of_the_week: 'WEDNESDAY', type: 'Real Estate', client_id: 90, photoshoot_id: 3},
    {id: 4, day_of_the_week: 'TUESDAY', type: 'Other', client_id: 70, photoshoot_id: 4},
    {id: 5, day_of_the_week: 'THURSDAY', type: 'Other', client_id: 55, photoshoot_id: 5},
    {id: 6, day_of_the_week: 'THURSDAY', type: 'Other', client_id: 104, photoshoot_id: 6},
    {id: 7, day_of_the_week: 'MONDAY', type: 'Event', client_id: 73, photoshoot_id: 7},
    {id: 8, day_of_the_week: 'TUESDAY', type: 'Food', client_id: 113, photoshoot_id: 8},
    {id: 9, day_of_the_week: 'WEDNESDAY', type: 'Other', client_id: 82, photoshoot_id: 9},
    {id: 10, day_of_the_week: 'MONDAY', type: 'Event', client_id: 107, photoshoot_id: 10}
  ];
}

export function getPhotoshootsDetails(): Array<PhotoshootDetailsResponse> {
  return [
    {id: 1, title: 'Marja', number_of_photos: 20, country: 'France', package: 'XS'},
    {id: 2, title: 'Rorie', number_of_photos: 492, country: 'Indonesia', package: 'L'},
    {id: 3, title: 'Bax', number_of_photos: 344, country: 'China', package: '3XL'},
    {id: 4, title: 'Ambrosio', number_of_photos: 296, country: 'Portugal', package: '3XL'},
    {id: 5, title: 'Budd', number_of_photos: 451, country: 'Israel', package: '2XL'},
    {id: 6, title: 'Odell', number_of_photos: 447, country: 'Ireland', package: 'M'},
    {id: 7, title: 'Julita', number_of_photos: 172, country: 'Lebanon', package: 'XL'},
    {id: 8, title: 'Alexandr', number_of_photos: 360, country: 'Libya', package: 'XL'},
    {id: 9, title: 'Sandie', number_of_photos: 307, country: 'Italy', package: 'XL'},
    {id: 10, title: 'Curry', number_of_photos: 95, country: 'Brunei', package: 'L'}
  ];
}

export function getPhotoshootsData(): Array<PhotoshootData> {
  return [
    {id: 1, dayOfTheWeek: 'FRIDAY', type: 'Real Estate', clientId: 71, numOfPhoto: 20},
    {id: 2, dayOfTheWeek: 'TUESDAY', type: 'Food', clientId: 96, numOfPhoto: 492},
    {id: 3, dayOfTheWeek: 'WEDNESDAY', type: 'Real Estate', clientId: 90, numOfPhoto: 344},
    {id: 4, dayOfTheWeek: 'TUESDAY', type: 'Other', clientId: 70, numOfPhoto: 296},
    {id: 5, dayOfTheWeek: 'THURSDAY', type: 'Other', clientId: 55, numOfPhoto: 451},
    {id: 6, dayOfTheWeek: 'THURSDAY',  type: 'Other', clientId: 104, numOfPhoto: 447},
    {id: 7, dayOfTheWeek: 'MONDAY', type: 'Event', clientId: 73, numOfPhoto: 172},
    {id: 8, dayOfTheWeek: 'TUESDAY', type: 'Food', clientId: 113, numOfPhoto: 360},
    {id: 9, dayOfTheWeek: 'WEDNESDAY', type: 'Other', clientId: 82, numOfPhoto: 307},
    {id: 10, dayOfTheWeek: 'MONDAY', type: 'Event', clientId: 107, numOfPhoto: 95}
  ];
}
