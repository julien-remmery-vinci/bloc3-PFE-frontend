import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { StatsService } from "../../services/stats.service";
import { Stats } from "../../types/Stats";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"],
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  pieChartOptions: Highcharts.Options = {};
  stats: Stats | null = null;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getStats().subscribe((stats: Stats) => {
      this.stats = stats;
      this.updateChartOptions();
      console.log(stats);
    });
  }

  updateChartOptions(): void {
    if (!this.stats) return;

    const totalTemplates =
      this.stats.total_templates_owned_facility +
      this.stats.total_templates_workers +
      this.stats.total_templates_products +
      this.stats.total_templates_facility;

    this.chartOptions = {
      chart: {
        type: "column",
      },
      title: {
        text: "Pourcentage des entreprises par type de template",
      },
      xAxis: {
        categories: ["OWNED FACILITY", "WORKERS", "PRODUITS", "FACILITY"],
      },
      yAxis: {
        title: {
          text: "Pourcentage",
        },
      },
      series: [
        {
          type: "column",
          name: "Pourcentage",
          data: [
            (this.stats.total_templates_owned_facility / totalTemplates) * 100,
            (this.stats.total_templates_workers / totalTemplates) * 100,
            (this.stats.total_templates_products / totalTemplates) * 100,
            (this.stats.total_templates_facility / totalTemplates) * 100,
          ],
        },
      ],
    };

    this.pieChartOptions = {
      chart: {
        type: "pie",
      },
      title: {
        text: "Répartition des rôles des utilisateurs",
      },
      series: [
        {
          type: "pie",
          name: "Utilisateurs",
          data: [
            { name: "Admin", y: 10 },
            { name: "User", y: 90 },
          ],
        },
      ],
    };
  }
}
