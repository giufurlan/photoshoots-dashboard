import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DashboardClientComponent} from './dashboard-client.component';
import {DashboardTypeComponent} from '../dashboard-type/dashboard-type.component';
import {DebugElement} from '@angular/core';
import {getPhotoshootsData} from '../utils/test/test-photoshoots';
import {By} from '@angular/platform-browser';

describe('DashboardClientComponent', () => {
  let component: DashboardClientComponent;
  let fixture: ComponentFixture<DashboardClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardClientComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ordered client\'s key alphabetically', () => {
    const expectedOrder = ['Client 55', 'Client 70', 'Client 82', 'Client 104'];

    const dashboard = new Map<string, Array<number>>([
      ['Client 104', [0,	0,	0,	20,	0,	0,	0]],
      ['Client 82', [0,	0,	20,	0,	0,	0,	0]],
      ['Client 70', [0,	20,	0,	0,	0,	0,	0]],
      ['Client 55', [0,	0,	0,	20,	0,	0,	0]]
    ]);
    expect(component.getClientKeySort()).toEqual(expectedOrder);
  });
});

describe('DashboardClientComponent when DashboardTypeComponent interact with it', () => {
  let child: DebugElement;
  let component: DashboardClientComponent;
  let parent: DashboardTypeComponent;
  let fixture: ComponentFixture<DashboardTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTypeComponent, DashboardClientComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTypeComponent);
    parent = fixture.componentInstance;
    parent.dashboardClient = true;
    fixture.detectChanges();
  });

  function getChildComponent() {
    let childDe: DebugElement;
    childDe = fixture.debugElement
      .query(de => de.componentInstance instanceof DashboardClientComponent);

    if (childDe && childDe.componentInstance) {
      component = childDe.componentInstance;
    } else {
      fail('Unable to find DashboardClientComponent within DashboardTypeComponent');
    }

    return component;
  }

  function getChild() {
    let childDe: DebugElement;
    childDe = fixture.debugElement
      .query(de => de.componentInstance instanceof DashboardClientComponent);

    if (childDe && childDe.componentInstance) {
      child = childDe;
    } else {
      fail('Unable to find DashboardClientComponent within DashboardTypeComponent');
    }

    return child;
  }

  it('should have the number of rows equals the number of client', fakeAsync(() => {
    fixture.detectChanges();
    getChildComponent();
    tick();

    parent.data = getPhotoshootsData();
    fixture.detectChanges();

    const photoshootsClientRows = Array.from(fixture.nativeElement.querySelectorAll('.dashboardClientRow'));
    const numOfClient = component.data.length;
    expect(numOfClient).toEqual(component.getClientKeySort().length);
    expect(numOfClient).toEqual(photoshootsClientRows.length);

  }));

  it('should not be visible dashboard per client after clicking close button ', fakeAsync(() => {
    fixture.detectChanges();
    getChild();
    tick();

    parent.data = getPhotoshootsData();
    fixture.detectChanges();

    const photoshoots = child.queryAll(By.css('tr'));
    expect(photoshoots.length).toBeGreaterThan(0);

    const button = child.query(By.css('.btn-close'));
    button.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();

    expect(parent.showDashboardClient()).toBeFalse();

  }));
});
