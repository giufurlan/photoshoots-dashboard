import {DayOfTheWeek} from './const';

export interface PhotoshootResponse{
  id: number;
  day_of_the_week: DayOfTheWeek;
  type: string;
  client_id: number;
  photoshoot_id: number;
}
