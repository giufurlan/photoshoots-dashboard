import {TestBed} from '@angular/core/testing';
import {AppService} from './app.service';
import {PhotoshootResponse} from './model/photoshoot.response';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {getPhotoshoots, getPhotoshootsDetails} from './utils/test/test-photoshoots';
import {PhotoshootDetailsResponse} from './model/photoshoot-details.response';


describe('AppService', () => {
  let httpClient = HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPhotoshootDaily(id)', () => {
    let expectedPhotoshoot: PhotoshootResponse;
    const photoshootId = 5;

    beforeEach(() => {
      service = TestBed.inject(AppService);
      expectedPhotoshoot = getPhotoshoots().find(p => p.photoshoot_id = photoshootId);
    });

    it('should return expected photoshoot from given id', () => {
      service.getPhotoshootDaily(photoshootId).subscribe(
        photoshoots => expect(photoshoots).toEqual(expectedPhotoshoot, 'should have a photshoot'),
        fail
      );

      const req = httpTestingController.expectOne(`${service.baseUrl}/photoshoots_daily/${photoshootId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPhotoshoot);
    });

  });

  describe('#getPhotoshootsDaily()', () => {
    let expectedPhotoshoots: PhotoshootResponse[];

    beforeEach(() => {
      service = TestBed.inject(AppService);
      expectedPhotoshoots = getPhotoshoots();
    });

    it('should return expected photoshoots', () => {
      service.getPhotoshootsDaily().subscribe(
        photoshoots => expect(photoshoots).toEqual(expectedPhotoshoots, 'should have filled photshoots array'),
        fail
      );

      const req = httpTestingController.expectOne(`${service.baseUrl}/photoshoots_daily/`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPhotoshoots);
    });

    it('should be OK returning no photoshoots', () => {
      service.getPhotoshootsDaily().subscribe(
        photoshoots => expect(photoshoots.length).toEqual(0, 'should have empty photshoots array'),
        fail
      );

      const req = httpTestingController.expectOne(`${service.baseUrl}/photoshoots_daily/`);
      req.flush([]);
    });

  });

  describe('#getPhotoshootsDetails()', () => {
    let expectedPhotoshootsDetails: PhotoshootDetailsResponse[];

    beforeEach(() => {
      service = TestBed.inject(AppService);
      expectedPhotoshootsDetails = getPhotoshootsDetails();
    });

    it('should return expected photoshoots', () => {
      service.getPhotoshootsDetails().subscribe(
        photoshoots => expect(photoshoots).toEqual(expectedPhotoshootsDetails, 'should have filled photshoots array'),
        fail
      );

      const req = httpTestingController.expectOne(`${service.baseUrl}/photoshoots_details/`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPhotoshootsDetails);
    });

    it('should be OK returning no photoshoots', () => {
      service.getPhotoshootsDetails().subscribe(
        photoshoots => expect(photoshoots.length).toEqual(0, 'should have empty photshoots array'),
        fail
      );

      const req = httpTestingController.expectOne(`${service.baseUrl}/photoshoots_details/`);
      req.flush([]);
    });


  });

  describe('#getPhotoshootDetails(id)', () => {
    let expectedPhotoshoot: PhotoshootDetailsResponse;
    const photoshootId = 7;

    beforeEach(() => {
      service = TestBed.inject(AppService);
      expectedPhotoshoot = getPhotoshootsDetails().find(p => p.id = photoshootId);
    });

    it('should return expected photoshoot from given id', () => {
      service.getPhotoshootDetails(photoshootId).subscribe(
        photoshoot => expect(photoshoot).toEqual(expectedPhotoshoot, 'should have a photshoot details'),
        fail
      );

      const req = httpTestingController.expectOne(`${service.baseUrl}/photoshoots_details/${photoshootId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPhotoshoot);
    });

  });

});
