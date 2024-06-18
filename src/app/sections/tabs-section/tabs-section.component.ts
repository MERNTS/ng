// tab-SectionsComponent.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabs-section',
  templateUrl: './tabs-section.component.html',
  styleUrls: ['./tabs-section.component.css']
})
export class TabsSectionComponent implements OnInit {
  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;

  activeTab: string = 'COMPLETED';
  filteredTransactions: any[] = [];
  transactions: any[] = [];
  transactionDetails: any = {};
  

  constructor(private http: HttpClient) {
    window.addEventListener('transactionsFetched', (event: CustomEvent) => {
      this.filteredTransactions = event.detail;
      this.filterTransactions(this.activeTab);
    });
  }

  ngOnInit() {
    this.fetchTransactions();
   }

   fetchTransactions() {
    this.http.get<any[]>('http://localhost:3001/api/transactions').subscribe(
      (data) => {
        this.transactions = data;
        this.filterTransactions(this.activeTab); // Filter initially based on default tab
      },
      (error) => {
        console.error('Failed to fetch transactions', error);
        // Handle error as needed
      }
    );
  }

  filterTransactions(status: string): void {
    this.activeTab = status; // Update active tab
    this.filteredTransactions = this.transactions.filter(transaction => transaction.status === status);
  }

  loadTransactionDetails(transactionId: number) {
    this.http.get<any>(`http://localhost:3001/api/transactions/${transactionId}`).subscribe(
      (response) => {
        this.transactionDetails = response; // Assuming response is in JSON format
      },
      (error) => {
        console.error('Failed to fetch transaction details', error);
      }
    );
  }

}
