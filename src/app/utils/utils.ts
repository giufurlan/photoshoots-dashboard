import {DayOfTheWeek, LIST_OF_DAYS} from '../model/const';

export function getIndexFromDay(dayOfTheWeek: DayOfTheWeek): number {
  return LIST_OF_DAYS.indexOf(dayOfTheWeek);
}

export function getOccurency(dashboard: Map<string, Array<number>>, key: string): Array<number> {
  return dashboard.has(key) ? dashboard.get(key) : Array.from(Array(7), _ => 0);
}
