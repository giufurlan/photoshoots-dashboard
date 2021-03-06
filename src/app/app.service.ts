import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PhotoshootResponse} from './model/photoshoot.response';
import {PhotoshootDetailsResponse} from './model/photoshoot-details.response';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  readonly baseUrl = 'https://frontend-test-api-server.herokuapp.com';

  private static getParams(limit?: number, offset?: number): HttpParams {
    const params = new HttpParams();
    if (Boolean(limit)) {
      params.set('limit', String(limit));
    }
    if (Boolean(offset)) {
      params.set('offset', String(offset));
    }
    return params;
  }

  constructor(private http: HttpClient) {
  }

  getPhotoshootsDaily(limit?: number, offset?: number): Observable<Array<PhotoshootResponse>> {
    const params = AppService.getParams(limit, offset);
    return this.http.get<Array<PhotoshootResponse>>(`${this.baseUrl}/photoshoots_daily/`, {params});
  }

  getPhotoshootDaily(id: number): Observable<PhotoshootResponse> {
    return this.http.get<PhotoshootResponse>(`${this.baseUrl}/photoshoots_daily/${id}`);
  }

  getPhotoshootsDetails(limit?: number, offset?: number): Observable<Array<PhotoshootDetailsResponse>> {
    const params = AppService.getParams(limit, offset);
    return this.http.get<Array<PhotoshootDetailsResponse>>(`${this.baseUrl}/photoshoots_details/`, {params});
  }

  getPhotoshootDetails(id: number): Observable<PhotoshootDetailsResponse> {
    return this.http.get<PhotoshootDetailsResponse>(`${this.baseUrl}/photoshoots_details/${id}`);
  }

}






