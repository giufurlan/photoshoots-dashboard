import {Component} from '@angular/core';
import {AppService} from './app.service';
import {photoshootMapper} from './mapper/photoshoot.mapper';
import {PhotoshootResponse} from './model/photoshoot.response';
import {PhotoshootDetailsResponse} from './model/photoshoot-details.response';
import {PhotoshootData} from './model/photoshoot.model';

const NUM_OF_ELEMENT = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService]
})
export class AppComponent {

  photoshoots: Array<PhotoshootResponse> = [];
  photoshootsDetails: Array<PhotoshootDetailsResponse> = [];
  photoshootData: Array<PhotoshootData> = [];

  request = 0;


  constructor(private service: AppService) {
    this.moreData();
  }

  moreData(): void {
    this.getData(this.request).then(_ => this.handleData());
    this.request += 1;
  }

  async getData(i: number): Promise<any> {
    await Promise.all([
      this.service.getPhotoshootsDaily(NUM_OF_ELEMENT, i * NUM_OF_ELEMENT).toPromise()
        .then(value => this.handlePhotoshoots(value), console.log),
      this.service.getPhotoshootsDetails(NUM_OF_ELEMENT, i * NUM_OF_ELEMENT).toPromise()
        .then(value => this.handlePhotoshootsDetails(value), console.log)
    ]);
  }

  handlePhotoshoots(photoshoots: Array<PhotoshootResponse>): void {
    this.photoshoots = photoshoots;
  }

  handlePhotoshootsDetails(photoshootsDetails: Array<PhotoshootDetailsResponse>): void {
    this.photoshootsDetails = photoshootsDetails;
  }

  handleData(): void {
    this.photoshootData = this.photoshoots.map(p =>
      photoshootMapper(p,
        this.photoshootsDetails.find(pDet => pDet.id = p.photoshoot_id)));
  }

  noMoreData(): boolean {
    return this.photoshoots.length === 0;
  }
}
