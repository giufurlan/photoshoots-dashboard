import {DayOfTheWeek} from './const';

export class PhotoshootData {
  constructor(public id: number,
              public dayOfTheWeek: DayOfTheWeek,
              public type: string,
              public clientId: number,
              public numOfPhoto: number) {
  }
}
