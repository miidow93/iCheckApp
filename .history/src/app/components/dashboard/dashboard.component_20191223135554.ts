import { Component, OnInit } from '@angular/core';
import { BaseChartDirective, Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { StatsService } from 'src/app/core/services/stats/stats.service';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { Icons } from 'src/app/shared/icons';
import { ToastController } from '@ionic/angular';
import * as __ from 'lodash';
import { SiteService } from 'src/app/core/services/site/site.service';
import { Engin } from 'src/app/shared/models/engin';
import { Constants } from 'src/app/shared/constants';
const moment = _moment;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dateStats = new FormControl(moment());
  messageLineChart;
  site;
  sites;
  // blockedSite = [];
  // notBlockedSite = [];
  // controledSite = [];
  // blocked;
  // NotBlocked;
  bennes = [];
  citernes = [];
  plateaus = [];
  data = {};
  all = [];
  Controled;
  benneIcon = Icons.benneImage;
  plateauIcon = Icons.plateauImage;
  citerneIcon = Icons.citerneImage;
  sidebar = Icons.sideimage;
  public barChartData: any[];
  public barChartLabels = [];
  engins: Engin[];
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


  public lineChartData: any[];
  public lineChartLabels = [];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            //stepSize: 1,
            min: 0
          }
        }
      ]
    }
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'Red',
      backgroundColor: 'rgba(236, 156, 156, 0.2)',
    },
  ];



  constructor(private statsService: StatsService,
    private siteService: SiteService,
    private toastCtrl: ToastController,
   ) { }

  ngOnInit() {
 
    this.site = localStorage.getItem('site');
    this.getAllSites();
    this.getNumberOfBlocked();
    this.getNumberOfNotBlocked();
    this.getNumberOfControledSite();
    this.getNumberOfcontroled();
    // this.getAllStats();
  }

  ngAfterViewInit() {

    this.statsByMonthAndYear();
    console.log(this.dateStats);
  }
  createImagePath(serverPath: string) {
    return `${Constants.serverImg}${serverPath}`;
    // return `http://localhost:4772/${serverPath}`;
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
        this.toastAlert('Aucune résultat');
      }
    });

    this.statsService.getStatsBlockedByMonth(this.site).subscribe((res: any) => {
      if (res.stats) {
        this.lineChartData = [{ data: this.getChartData(res.stats), label: 'Camions Non Conforme' }];
        this.lineChartLabels = this.getChartLabels(res.stats);
      } else {
        this.messageLineChart = 'Aucun résultat';
      }
    });
  }

  getNumberOfBlocked() {
    return this.statsService.getStatusBysite('benne').subscribe((res: any) => {
      console.log('benne status: ', res);
      // for (let i = 0; i < res.stats.length; i++) {
      //   // this.blockedSite.push(res.stats[i])
      // }
    });
  }

  getNumberOfNotBlocked() {
    return this.statsService.getNumberOfNotBlocked().subscribe((res: any) => {
      console.log('Not Blocked: ', res);
      for (let i = 0; i < res.stats.length; i++) {

        // this.citernes = res;
        // console.log('NotBlocked :',this.citernes)
      }
    });
  }

  getAllStats() {
    this.statsService.getStats().subscribe((res: any) => {
      console.log('Result: ', res);
      if (this.sites.length > 0) {
        console.log('Sites 1: ', this.sites);
        // this.bennes = this.mergeCustomizer(res, 'Benne');
        // this.citernes = this.mergeCustomizer(res, 'Citerne');
        // this.plateaus = this.mergeCustomizerBenne(this.sites, res, 'Plateau')
      }

      // const allData = res;
      // this.bennes = allData.filter(x => x.type === 'Benne');

      // this.plateaus = allData.filter(x => x.type === 'Plateau')

      // this.citernes = allData.filter(x => x.type === 'Citerne');

      // console.log('Plateaus: ', this.plateaus);
      // console.log('bennes: ', this.bennes);
      // console.log('Citernes: ', this.citernes);
    });
  }

  getAllSites() {
    this.statsService.getStats().subscribe(res => {
      console.log('Dashboard Stats: ', res);
      this.bennes = res["bennes"];
      this.citernes = res["citernes"];
      this.plateaus = res["plateaus"];
    })
  }

  getNumberOfControledSite() {
    return this.statsService.getNumberOfControled().subscribe((res: any) => {
      for (let i = 0; i < res.stats.length; i++) {
        // this.controledSite.push(res.stats[i])
      }
    });
  }

  getNumberOfcontroled() {
    return this.statsService.getControled().subscribe(res => {
      this.Controled = res;
    });
  }

  async toastAlert(msg) {
    const toast = await this.toastCtrl.create({
      message: `${msg}`,
      duration: 2000,
      color: 'danger'
    });

    toast.present();
  }

}


