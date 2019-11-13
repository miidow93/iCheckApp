import { Component, OnInit } from '@angular/core';
import { BaseChartDirective, Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { StatsService } from 'src/app/core/services/stats/stats.service';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
const moment = _moment;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dateStats = new FormControl(moment());
  public barChartData: any[];
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            min: 0
          }
        }
      ]
    }
  };
  public barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#eedd41',
    },
  ];


  constructor(private statsService:StatsService) { }

  ngOnInit() {}
  
  ngAfterViewInit() {
    this.statsByMonthAndYear();
    console.log(this.dateStats);
  }

  getChartData(stats) {
    let data = [];
    stats.forEach(element => {
      data.push(element.count);
    });
    return data;
  }

  getChartLabels(stats) {
    let labels = [];
    stats.forEach(element => {
      labels.push(element.label);
    });

    return labels;
  }
  statsByMonthAndYear() {

    this.statsService.getStatsByMonth().subscribe((res: any) => {
      if (res.stats) {
        this.barChartData = [{ data: this.getChartData(res.stats), label: 'Camions' }];
        this.barChartLabels = this.getChartLabels(res.stats);
      } else {
        alert('Aucune résultat');
      }
    });
  }
}


