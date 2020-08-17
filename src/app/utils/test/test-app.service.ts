import {Injectable} from '@angular/core';
import {AppService} from '../../app.service';
import {Observable} from 'rxjs';
import {PhotoshootResponse} from '../../model/photoshoot.response';
import {PhotoshootDetailsResponse} from '../../model/photoshoot-details.response';
import {getPhotoshoots, getPhotoshootsDetails} from './test-photoshoots';
import {asyncData} from './test.utils';

@Injectable()
export class TestAppService extends AppService {
  constructor() {
    super(null);
  }

  getPhotoshootsDaily(limit?: number, offset?: number): Observable<Array<PhotoshootResponse>> {
    return asyncData(getPhotoshoots());
  }

  getPhotoshootDaily(id: number): Observable<PhotoshootResponse> {
    return asyncData(getPhotoshoots().find(p => p.photoshoot_id = id));
  }

  getPhotoshootsDetails(limit?: number, offset?: number): Observable<Array<PhotoshootDetailsResponse>> {
    return asyncData(getPhotoshootsDetails());
  }

  getPhotoshootDetails(id: number): Observable<PhotoshootDetailsResponse> {
    return asyncData(getPhotoshootsDetails().find(p => p.id = id));
  }
}
