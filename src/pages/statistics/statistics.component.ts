import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  pieChartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Nombre d\'utilisateurs par mois'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: 'Nombre d\'utilisateurs'
        }
      },
      series: [{
        type: 'column',
        name: 'Utilisateurs',
        data: [50, 80, 45, 60, 70, 90, 100, 85, 75, 95, 65, 55]
      }]
    };

    this.pieChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Répartition des rôles des utilisateurs'
      },
      series: [{
        type: 'pie',
        name: 'Utilisateurs',
        data: [
          { name: 'Admin', y: 10 },
          { name: 'User', y: 90 }
        ]
      }]
    };
  }
}