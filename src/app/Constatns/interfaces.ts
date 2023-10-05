export interface eurostate {
  ID: number;
  Country: string;
  Category: string;
  CategoryGroup: string;
  URL: string;
  Unit: string;
  Frequency: string;
  LatestValue: number;
  LatestValueDate: string;
  PreviousValue: number;
  PreviousValueDate: string;
  FirstValue: number;
  FirstValueDate: string;
  HighestValue: number;
  HighestValueDate: string;
  LowestValue: number;
  LowestValueDate: string;
  LastUpdate: string;
}

export interface data {
  date: string;
  value: any;
}

export interface PeriodicElement {
  data: data[];
  interval: string;
  name: string;
  unit: string;
}
