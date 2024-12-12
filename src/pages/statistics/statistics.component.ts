import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StatsService } from '../../services/stats.service';
import { Stats } from '../../types/stats';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  pieChartOptions: Highcharts.Options;
  updateFlag = false;
  stats: Stats | null = null;

  constructor(private statsService: StatsService) {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Pourcentage des entreprises par type de template'
      },
      xAxis: {
        categories: ['OWNED FACILITY', 'WORKERS', 'PRODUITS', 'FACILITY']
      },
      yAxis: {
        title: {
          text: 'Pourcentage'
        }
      },
      series: [{
        type: 'column',
        name: 'Pourcentage',
        data: [0, 0, 0, 0]
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
          { name: 'Admin', y: 0 },
          { name: 'User', y: 0 }
        ]
      }]
    };
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getStats().subscribe((stats: Stats) => {
      this.stats = stats;
      this.updateChartOptions();
      this.updatePieChartOptions();
      this.updateFlag = true;
    });
  }

  updateChartOptions(): void {
    if (!this.stats) return;

    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Pourcentage des entreprises par type de template'
      },
      xAxis: {
        categories: ['OWNED FACILITY', 'WORKERS', 'PRODUITS', 'FACILITY']
      },
      yAxis: {
        title: {
          text: 'Pourcentage'
        }
      },
      series: [{
        type: 'column',
        name: 'Pourcentage',
        data: [
          this.stats.total_templates_owned_facility,
          this.stats.total_templates_workers,
          this.stats.total_templates_products,
          this.stats.total_templates_facility
        ]
      }]
    };
  }

  updatePieChartOptions(): void {
    if (!this.stats) return;

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
          { name: 'Admin', y: this.stats.total_accepted_onboarding },
          { name: 'User', y: this.stats.total_rejected_onboarding }
        ]
      }]
    };
  }
}