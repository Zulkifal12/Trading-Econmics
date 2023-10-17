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
