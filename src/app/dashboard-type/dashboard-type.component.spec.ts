import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DashboardTypeComponent} from './dashboard-type.component';
import {getPhotoshootsData} from '../utils/test/test-photoshoots';
import {DebugElement} from '@angular/core';
import {AppComponent} from '../app.component';
import {AppModule} from '../app.module';

describe('DashboardTypeComponent', () => {
  let component: DashboardTypeComponent;
  let fixture: ComponentFixture<DashboardTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.showDashboardClient()).toBeFalse();
  });

  it('should insert a new key,value on dashboardDataPerDay for no existing key', () => {
    const expectedMap = new Map<string, Array<number>>([
      ['Real Estate', [0, 0, 0, 0, 20, 0, 0]]
    ]);
    const expectedTotal = [0, 0, 0, 0, 20, 0, 0];
    component.totalPerDay = Array.from(Array(7), _ => 0);
    component.dashboardDataPerDay.clear();
    const photoshootData = getPhotoshootsData()[0];
    component.initMap([photoshootData]);

    expect(expectedMap).toEqual(component.dashboardDataPerDay);
    expect(expectedTotal).toEqual(component.totalPerDay);

    expect(component.dashboardDataPerDayKeys.find(key => key = photoshootData.type)).not.toBeUndefined();
  });

  it('should update an existing key,value on dashboardDataPerDay if already existing key and different day', () => {
    const expectedMap = new Map<string, Array<number>>([
      ['Real Estate', [0, 0, 344, 0, 20, 0, 0]]
    ]);
    const expectedTotal = [0, 0, 344, 0, 20, 0, 0];
    component.totalPerDay = Array.from(Array(7), _ => 0);
    component.dashboardDataPerDay.clear();
    const photoshootData = [getPhotoshootsData()[0], getPhotoshootsData()[2]];
    component.initMap(photoshootData);

    expect(expectedMap).toEqual(component.dashboardDataPerDay);
    expect(expectedTotal).toEqual(component.totalPerDay);

    expect(component.dashboardDataPerDayKeys.find(key => key === 'Real Estate')).not.toBeUndefined();
  });

  it('should update an existing key,value on dashboardDataPerDay if already existing key  and same day', () => {
    const expectedMap = new Map<string, Array<number>>([
      ['Other', [0, 0, 0, 898, 0, 0, 0]]
    ]);
    const expectedTotal = [0, 0, 0, 898, 0, 0, 0];
    component.totalPerDay = Array.from(Array(7), _ => 0);
    component.dashboardDataPerDay.clear();
    const photoshootData = [getPhotoshootsData()[4], getPhotoshootsData()[5]];
    component.initMap(photoshootData);

    expect(expectedMap).toEqual(component.dashboardDataPerDay);
    expect(expectedTotal).toEqual(component.totalPerDay);

    expect(component.dashboardDataPerDayKeys.find(key => key === 'Other')).not.toBeUndefined();
  });

  it('should fill photoshootClientList when you click the button on a row of the table', fakeAsync(() => {
    const data = getPhotoshootsData();
    component.data = data;
    component.initMap(data);
    fixture.detectChanges();

    const photoshootsTypesRows = fixture.nativeElement.querySelectorAll('.dashboardTypeRow') as NodeList;
    const photoshootType = component.dashboardDataPerDayKeys[1];
    photoshootsTypesRows.item(1).dispatchEvent(new Event('click'));
    tick();

    expect(component.photoshootClientList.length).toBe(data.filter(p => p.type === photoshootType).length);
    expect(component.photoshootClientList.every(p => p.type === photoshootType)).toBeTrue();
    expect(component.showDashboardClient()).toBeTrue();
  }));
});

describe('DashboardTypeComponent when AppComponent change the value of input field', () => {
  let component: DashboardTypeComponent;
  let parent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [AppComponent, DashboardTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    parent = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getChildComponent() {
    let childDe: DebugElement;
    childDe = fixture.debugElement
      .query(de => de.componentInstance instanceof DashboardTypeComponent);

    if (childDe && childDe.componentInstance) {
      component = childDe.componentInstance;
    } else {
      fail('Unable to find DashboardTypeComponent within AppComponent');
    }

    return component;
  }

  it('should have the number of rows equals the distict number of type of photoshoots ', fakeAsync(() => {
    fixture.detectChanges();
    getChildComponent();
    tick();

    parent.photoshootData = getPhotoshootsData();
    fixture.detectChanges();

    const photoshootsTypesRows = Array.from(fixture.nativeElement.querySelectorAll('.dashboardTypeRow'));
    const numOfTypes = new Set(component.data.map(p => p.type)).size;
    expect(numOfTypes).toEqual(component.dashboardDataPerDayKeys.length);
    expect(numOfTypes).toEqual(photoshootsTypesRows.length);

  }));
});


