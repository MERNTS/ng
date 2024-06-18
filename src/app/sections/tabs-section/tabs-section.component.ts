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

  filteredTransactions: any[] = [];
  transactionDetails: any = {};

  constructor(private http: HttpClient) {
    window.addEventListener('transactionsFetched', (event: CustomEvent) => {
      this.filteredTransactions = event.detail;
    });
  }

  loadTransactionDetails(transactionId: number) {
    // Replace with your actual API endpoint and HTTP method (GET, POST, etc.)
    console.log(transactionId)
    this.http.get<any>(`http://localhost:3001/api/transactions/${transactionId}`).subscribe(
      (response) => {
        this.transactionDetails = response; // Assuming response is in JSON format
        console.log(this.transactionDetails)
      },
      (error) => {
        console.error('Failed to fetch transaction details', error);
        // Handle error as needed
      }
    );
  }

  ngOnInit() { }

}
