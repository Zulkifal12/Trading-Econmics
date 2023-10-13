import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apikey, apikey2, domainName } from 'src/app/Constatns/app-helper';

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

  getTreasuryYield(interval: string) {
    return this.http.get(
      `${domainName}?function=TREASURY_YIELD&interval=${interval}&maturity=10&apikey=${apikey}`
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
    return this.http.get(`${domainName}?function=INFLATION&apikey=${apikey2}`);
  }
  getRetailSales() {
    return this.http.get(
      `${domainName}?function=RETAIL_SALES&apikey=${apikey2}`
    );
  }

  getUnemployment() {
    return this.http.get(
      `${domainName}?function=UNEMPLOYMENT&apikey=${apikey2}`
    );
  }

  getNonFarmPayroll() {
    return this.http.get(
      `${domainName}?function=NONFARM_PAYROLL&apikey=${apikey2}`
    );
  }
}
