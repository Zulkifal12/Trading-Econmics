import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apikey, domainName } from 'src/app/Constatns/app-helper';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor(private http: HttpClient) {}

  getRealGDP(interval: string) {
    return this.http.get(
      `${domainName}?function=REAL_GDP&interval=${interval}&apikey=${apikey}`
    );
  }

  getRealGDPperCapita() {
    return this.http.get(
      `${domainName}?function=REAL_GDP_PER_CAPITA&apikey=${apikey}`
    );
  }

  getTreasuryYield(interval: string, maturity: string) {
    return this.http.get(
      `${domainName}?function=TREASURY_YIELD&interval=${interval}&maturity=${maturity}&apikey=${apikey}`
    );
  }

  getFederalFundsRate(interval: string) {
    return this.http.get(
      `${domainName}?function=FEDERAL_FUNDS_RATE&interval=${interval}&apikey=${apikey}`
    );
  }
  getCPi(interval: string) {
    return this.http.get(
      `${domainName}?function=CPI&interval=${interval}&apikey=${apikey}`
    );
  }
  getInflation() {
    return this.http.get(`${domainName}?function=INFLATION&apikey=${apikey}`);
  }
  getRetailSales() {
    return this.http.get(
      `${domainName}?function=RETAIL_SALES&apikey=${apikey}`
    );
  }

  getUnemployment() {
    return this.http.get(
      `${domainName}?function=UNEMPLOYMENT&apikey=${apikey}`
    );
  }

  getNonFarmPayroll() {
    return this.http.get(
      `${domainName}?function=NONFARM_PAYROLL&apikey=${apikey}`
    );
  }
}
