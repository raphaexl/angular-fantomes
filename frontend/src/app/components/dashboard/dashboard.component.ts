import { Component, OnInit } from '@angular/core';
import { Fantome } from '../../fantome';
import { FantomeService } from '../../services/fantome.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  fantomes: Fantome[] = [];

  constructor(private fantomeService: FantomeService) { }

  ngOnInit(): void {
    this.getFantomes();
  }

  getFantomes(): void {
    this.fantomeService.getFantomes()
      .subscribe(fantomes => this.fantomes = fantomes.slice(1, 5));
  }
}
