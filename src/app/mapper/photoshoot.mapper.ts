import {PhotoshootResponse} from '../model/photoshoot.response';
import {PhotoshootData} from '../model/photoshoot.model';
import {PhotoshootDetailsResponse} from '../model/photoshoot-details.response';


export function photoshootMapper(photoshoot: PhotoshootResponse, photoshootDetails: PhotoshootDetailsResponse): PhotoshootData {
  return Boolean(photoshoot) && Boolean(photoshootDetails)
    ? new PhotoshootData(photoshoot.id,
      photoshoot.day_of_the_week,
      photoshoot.type,
      photoshoot.client_id,
      photoshootDetails.number_of_photos)
    : null;
}
