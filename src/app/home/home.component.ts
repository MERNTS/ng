import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };

  focus;
  focus1;

  fromDate: string;
  toDate: string;

  transactions = [];
  filteredTransactions = this.transactions;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() { }

  searchTransactions() {
    console.log(`Fetching transactions from ${this.fromDate} to ${this.toDate}`);
    this.transactionService.getTransactions(this.fromDate, this.toDate).subscribe((data: any) => {
      console.log('Data fetched from API:', data);
      this.filteredTransactions = data;
      this.passDataToSections(data);
    });
  }

  passDataToSections(data: any) {
    console.log('Dispatching transactionsFetched event with data1:', data);
    const event = new CustomEvent('transactionsFetched', { detail: data });
    console.log('Dispatching transactionsFetched event with data2:', data);
    window.dispatchEvent(event);
  }
}
