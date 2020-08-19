import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DayOfTheWeek, LIST_OF_DAYS} from '../model/const';
import {getIndexFromDay, getOccurency} from '../utils/utils';
import {PhotoshootData} from '../model/photoshoot.model';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html'
})
export class DashboardClientComponent implements OnChanges {

  @Input() data: Array<PhotoshootData>;
  @Output() closeModalEvent: EventEmitter<boolean>;

  daysOfTheWeek: Array<DayOfTheWeek> = LIST_OF_DAYS;
  dashboardDataPerClient: Map<string, Array<number>> = new Map<string, Array<number>>();

  private static getClientName(id: number): string {
    return `Client ${id}`;
  }

  constructor() {
    this.closeModalEvent = new EventEmitter<boolean>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetClientTable();
    this.data.forEach(p => this.updateDashboardPerClient(p));
  }

  onClickCloseModal(): void {
    this.closeModalEvent.emit(false);
  }

  getClientKeySort(): Array<string> {
    return Array.from(this.dashboardDataPerClient.keys()).sort((a, b) => a.localeCompare(b, 'en', {numeric: true}));
  }

  resetClientTable(): void {
    this.dashboardDataPerClient.clear();
  }

  private getOccurencyPerClient(key: string): Array<number> {
    return getOccurency(this.dashboardDataPerClient, key);
  }

  private updateDashboardPerClient(data: PhotoshootData): void {
    const occur = this.getOccurencyPerClient(DashboardClientComponent.getClientName(data.clientId));
    occur[getIndexFromDay(data.dayOfTheWeek)] += data.numOfPhoto;
    this.dashboardDataPerClient.set(DashboardClientComponent.getClientName(data.clientId), occur);
  }
}
