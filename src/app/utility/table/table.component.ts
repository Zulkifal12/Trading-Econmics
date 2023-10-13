import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { fakedata } from 'src/app/Constatns/app-helper';
import { data } from 'src/app/Constatns/interfaces';
import { CommonServiceService } from 'src/app/Services/common-service.service';

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  gdps: data[] = [];
  realGDP: boolean = true;
  realGDPperCapita: boolean = false;
  treasury_Yield: boolean = false;
  federalFundsRate: boolean = false;
  cpi: boolean = false;
  inflation: boolean = false;
  retailSales: boolean = false;
  unemploymentRate: boolean = false;
  nonFormPayroll: boolean = false;
  selectedInterval: string = 'quarterly';
  selectedOption: string = 'realGDP';
  selectedIntervalTreasury: string = 'monthly';
  selectedMaturityTreasury: string = '10year';
  selectedIntervalFfr: string = 'monthly';
  selectedCPI: string = 'monthly';
  myChart!: any;
  mybarChart!: any;

  constructor(private common_service: CommonServiceService) {
    this.getRealGDP();
  }
  ngOnInit(): void {}
  renderBarChart(unit: string, data: any) {
    this.mybarChart = new Chart('tx_plan_stats', {
      type: 'bar',
      data: {
        labels: data.map((x: any) => x.date),
        datasets: [
          {
            label: 'UNIT: ' + unit.toUpperCase(),
            data: data.map((x: any) => x.value),
            backgroundColor: 'rgba(255, 206, 84)', // Set a single color here
            borderColor: 'rgb(255, 206, 84, 0.3)', // Set a single color here
            borderWidth: 0.2,
          },
        ],
      },
    });
  }

  renderLineChart(unit: string, data: any) {
    this.myChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: data.map((x: any) => this.convertToYear(x.date)),
        datasets: [
          {
            label: 'UNIT: ' + unit.toUpperCase(),
            data: data.map((x: any) => x.value),
            backgroundColor: ['rgba(140, 193, 82, 0.3)'],
            borderColor: ['rgb(237, 85, 101)'],
            borderWidth: 0.8,
          },
        ],
      },
    });
  }

  convertToYear(dateStr: string): string {
    const date = new Date(dateStr);
    return date.getFullYear().toString();
  }
  intervalChange() {
    if (this.selectedOption == 'treasuryYield') {
      console.log('treasuryYield', this.selectedIntervalTreasury);
      this.getTreasuryYield();
    }
    if (this.selectedOption == 'federalFundsRate') {
      console.log('treasuryYield', this.selectedIntervalFfr);
      // this.getFederalFundsRate();
    }
    if (this.selectedOption == 'CPI') {
      console.log('treasuryYield', this.selectedCPI);
      this.getCPi();
    }
  }
  selectOption(option: string) {
    this.selectedOption = option;
    if (this.selectedOption == 'realGDP') {
      this.getRealGDP();
      this.realGDP = true;
    } else {
      this.realGDP = false;
    }
    if (this.selectedOption == 'realGDPperCapita') {
      this.getRealGDPperCapita();
      this.realGDPperCapita = true;
    } else {
      this.realGDPperCapita = false;
    }
    if (this.selectedOption == 'treasuryYield') {
      this.treasury_Yield = true;
      this.getTreasuryYield();
    } else {
      this.treasury_Yield = false;
    }
    if (this.selectedOption == 'federalFundsRate') {
      this.federalFundsRate = true;
      this.getFederalFundsRate();
    } else {
      this.federalFundsRate = false;
    }
    if (this.selectedOption == 'CPI') {
      this.cpi = true;
      this.getCPi();
    } else {
      this.cpi = false;
    }
    if (this.selectedOption == 'inflation') {
      this.inflation = true;
      this.getInflation();
    } else {
      this.inflation = false;
    }
    if (this.selectedOption == 'retailSales') {
      this.retailSales = true;
      this.getRetailSales();
    } else {
      this.retailSales = false;
    }
    if (this.selectedOption == 'unemployed') {
      this.unemploymentRate = true;
      this.getUnemployment();
    } else {
      this.unemploymentRate = false;
    }
    if (this.selectedOption == 'nonFormPayroll') {
      this.nonFormPayroll = true;
      this.getNonFarmPayroll();
    } else {
      this.nonFormPayroll = false;
    }
  }

  getRealGDP() {
    this.common_service
      .getRealGDP(this.selectedInterval)
      .subscribe((data: any) => {
        if (data) {
          this.gdps = [];
          this.gdps = data.data;
          if (this.myChart) this.myChart.destroy();
          if (this.mybarChart) this.mybarChart.destroy();
          this.renderBarChart(data.unit, data.data.reverse());
          this.renderLineChart(data.unit, data.data);
        }
      });
  }

  getRealGDPperCapita() {
    this.common_service.getRealGDPperCapita().subscribe((data: any) => {
      if (data) {
        this.gdps = [];
        this.gdps = data.data;
        const modifiedData = this.convertToYearlyData(data.data);
        if (this.myChart) this.myChart.destroy();
        if (this.mybarChart) this.mybarChart.destroy();
        this.renderBarChart('Millions', modifiedData);
        this.renderLineChart('Millions', data.data.reverse());
      }
    });
  }

  convertToYearlyData(data: any) {
    const yearlyData = [];
    const yearToValueMap: any = {};

    for (const entry of data) {
      const dateParts = entry.date.split('-');
      const year = parseInt(dateParts[0]);
      const value = parseFloat(entry.value);

      if (yearToValueMap[year]) {
        yearToValueMap[year] += value;
      } else {
        yearToValueMap[year] = value;
      }
    }

    for (const year in yearToValueMap) {
      if (yearToValueMap.hasOwnProperty(year)) {
        yearlyData.push({ date: year, value: yearToValueMap[year].toString() });
      }
    }

    return yearlyData;
  }

  getTreasuryYield() {
    this.common_service
      .getTreasuryYield(this.selectedIntervalTreasury)
      .subscribe((data: any) => {
        if (data) {
          this.gdps = [];
          this.gdps = data.data;
          const modifiedData = this.convertToYearlyData(data.data);
          const average_modifiedData = modifiedData.map((data) => {
            data.value = data.value / 12;
            return data;
          });
          console.log('Data', data);
          if (this.myChart) this.myChart.destroy();
          if (this.mybarChart) this.mybarChart.destroy();
          this.renderBarChart(
            data.unit + ' ' + 'per/year',
            average_modifiedData
          );
          this.renderLineChart(
            data.unit + ' ' + 'per/year',
            average_modifiedData
          );
        }
      });
  }

  getFederalFundsRate() {
    this.common_service
      .getFederalFundsRate(this.selectedIntervalFfr)
      .subscribe((data: any) => {
        if (data) {
          this.gdps = [];
          this.gdps = data.data;
          const modifiedData = this.convertToYearlyData(data.data);
          if (this.myChart) this.myChart.destroy();
          if (this.mybarChart) this.mybarChart.destroy();
          this.renderBarChart(data.unit, modifiedData);
          this.renderLineChart(data.unit, modifiedData);
        }
      });
  }

  getCPi() {
    this.common_service.getCPi(this.selectedCPI).subscribe((data: any) => {
      if (data) {
        this.gdps = [];
        this.gdps = data.data;
        const modifiedData = this.convertToYearlyData(data.data);
        if (this.myChart) this.myChart.destroy();
        if (this.mybarChart) this.mybarChart.destroy();
        this.renderBarChart(data.unit, modifiedData);
        this.renderLineChart(data.unit, modifiedData);
      }
    });
  }

  getInflation() {
    this.common_service.getInflation().subscribe((data: any) => {
      if (data) {
        this.gdps = [];
        this.gdps = data.data;
        const modifiedData = this.convertToYearlyData(data.data);
        if (this.myChart) this.myChart.destroy();
        if (this.mybarChart) this.mybarChart.destroy();
        this.renderBarChart(data.unit, modifiedData);
        this.renderLineChart(data.unit, modifiedData);
      }
    });
  }

  getRetailSales() {
    this.common_service.getRetailSales().subscribe((data: any) => {
      if (data) {
        this.gdps = [];
        this.gdps = data.data;
        const modifiedData = this.convertToYearlyData(data.data);
        if (this.myChart) this.myChart.destroy();
        if (this.mybarChart) this.mybarChart.destroy();
        this.renderBarChart(data.unit, modifiedData);
        this.renderLineChart(data.unit, modifiedData);
      }
    });
  }
  getUnemployment() {
    this.common_service.getUnemployment().subscribe((data: any) => {
      if (data) {
        this.gdps = [];
        this.gdps = data.data;
        const modifiedData = this.convertToYearlyData(data.data);
        modifiedData.map((data: any) => {
          data.value = data.value / 12;
        });
        if (this.myChart) this.myChart.destroy();
        if (this.mybarChart) this.mybarChart.destroy();
        this.renderBarChart(data.unit + '/Year', modifiedData);
        this.renderLineChart(data.unit + '/Year', modifiedData);
      }
    });
  }

  getNonFarmPayroll() {
    this.common_service.getNonFarmPayroll().subscribe((data: any) => {
      if (data) {
        this.gdps = [];
        this.gdps = data.data;
        const modifiedData = this.convertToYearlyData(data.data);
        if (this.myChart) this.myChart.destroy();
        if (this.mybarChart) this.mybarChart.destroy();
        this.renderBarChart(data.unit, modifiedData);
        this.renderLineChart(data.unit, modifiedData);
      }
    });
  }
}
