import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PhotoshootData} from '../model/photoshoot.model';
import {DayOfTheWeek, LIST_OF_DAYS} from '../model/const';
import {getIndexFromDay, getOccurency} from '../utils/utils';

@Component({
  selector: 'app-dashboard-type',
  templateUrl: './dashboard-type.component.html',
  styleUrls: ['./dashboard-type.component.css']
})
export class DashboardTypeComponent implements OnChanges {

  @Input() data: Array<PhotoshootData>;

  photoshootList: Array<PhotoshootData>;
  daysOfTheWeek: Array<DayOfTheWeek> = LIST_OF_DAYS;
  dashboardDataPerDay: Map<string, Array<number>> = new Map<string, Array<number>>();
  dashboardDataPerDayKeys = [];
  totalPerDay: Array<number> = [];

  photoshootClientList: Array<PhotoshootData> = [];

  constructor() {
    this.totalPerDay = Array.from(Array(7), _ => 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initMap(changes.data.currentValue);
  }

  onClickPhotoshootType(type: string): void {
    this.photoshootClientList = this.data.filter(p => p.type === type);
  }

  initMap(photoshootData: Array<PhotoshootData>): void {
    photoshootData.forEach(p => this.updateDashboardPerDay(p));
    this.dashboardDataPerDayKeys = Array.from(this.dashboardDataPerDay.keys());
  }

  private updateDashboardPerDay(data: PhotoshootData): void {
    const occur = this.getOccurencyPerDay(data.type);
    const index = getIndexFromDay(data.dayOfTheWeek);
    occur[index] += data.numOfPhoto;
    this.totalPerDay[index] += data.numOfPhoto;
    this.dashboardDataPerDay.set(data.type, occur);
  }

  private getOccurencyPerDay(key: string): Array<number> {
    return getOccurency(this.dashboardDataPerDay, key);
  }
}
