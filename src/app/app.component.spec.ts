import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {PhotoshootResponse} from './model/photoshoot.response';
import {from, Observable} from 'rxjs';
import {TestAppService} from './utils/test/test-app.service';
import {AppModule} from './app.module';
import {getPhotoshoots, getPhotoshootsDetails} from './utils/test/test-photoshoots';
import {asyncData} from './utils/test/test.utils';
import {PhotoshootDetailsResponse} from './model/photoshoot-details.response';

describe('AppComponent', () => {

  let fixture;
  let app;

  describe('when AppModule setup', () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [AppModule],
        providers: [{provide: AppService, useValue: TestAppService}]
      }).compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
    }));

    it('should create the app', () => {
      expect(app).toBeTruthy();
    });

    it('should have the button to get more data', () => {
      const buttonList = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLLIElement[];
      expect(buttonList.find(btn => btn.id === 'moreData')).toBeTruthy();
    });

    it('should did a request', () => {
      expect(app.request).toEqual(1);
    });

    it('3rd photoshoot should match with 3rd test photoshoot', () => {
      expect(app.photoshoots[3]).toEqual(getPhotoshoots()[3]);
    });

    it('2nd photoshoot details should match with 2nd test photoshoot details', () => {
      expect(app.photoshootsDetails[2]).toEqual(getPhotoshootsDetails()[2]);
    });

    it('photoshootData should have the same length that photoshoot', () => {
      expect(app.photoshootData.length).toEqual(getPhotoshoots().length);
    });
  });

  describe('when override its provide AppService', () => {
    class AppServiceSpy {
      getPhotoshootsDaily = jasmine.createSpy('getPhotoshootsDaily').and.callFake(
        () => asyncData(getPhotoshoots() as Array<PhotoshootResponse>)
      );

      /* emit clone of test hero, with changes merged in */
      getPhotoshootsDetails = jasmine.createSpy('getPhotoshootsDetails').and.callFake(
        () => asyncData(getPhotoshootsDetails() as Array<PhotoshootDetailsResponse>)
      );
    }

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [AppModule],
        providers: [
          {provide: AppService, useValue: {}}
        ]
      })
        .overrideComponent(AppComponent, {
          set: {
            providers: [
              {provide: AppService, useClass: AppServiceSpy}
            ]
          }
        })

        .compileComponents();
    }));

    let appServiceSpy: AppServiceSpy;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      appServiceSpy = fixture.debugElement.injector.get(AppService) as any;
    }));

    it('should call getPhotoshootsDaily and getPhotoshootsDetails', () => {
      expect(appServiceSpy.getPhotoshootsDaily.calls.count()).toBe(1, 'getPhotoshootsDaily called once');
      expect(appServiceSpy.getPhotoshootsDetails.calls.count()).toBe(1, 'getPhotoshootsDaily called once');
    });

    it('should call getPhotoshootsDaily and getPhotoshootsDetails after clicked the button', fakeAsync(() => {
      const button = fixture.nativeElement.querySelector('#moreData') as HTMLLIElement;
      button.dispatchEvent(new Event('click'));
      tick();

      expect(appServiceSpy.getPhotoshootsDaily.calls.count()).toBe(2, 'getPhotoshootsDaily called twice');
      expect(appServiceSpy.getPhotoshootsDetails.calls.count()).toBe(2, 'getPhotoshootsDetails called twice');
      expect(app.request).toEqual(2);
    }));
  });

});
