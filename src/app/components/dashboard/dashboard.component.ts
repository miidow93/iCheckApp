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
  
  countbenneBlock;
  countciternesBlock;
  countplateausBlock;
  countbenneNotBlock;
  countciternesNotBlock;
  countplateausNotBlock;
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
  interval: any;
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
      backgroundColor: 'rgb(0, 110, 130)',
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
      backgroundColor: 'rgba(0, 110, 130, 0.2)',
    },
  ];

  public DoughnutChartData: any[];
  public DoughnutChartLabels = [];
  public DoughnutChartType = 'doughnut';
  public DoughnutChartLegend = true;
  public DoughnutChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
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
  

  public DoughnutChartColors: Color[] = [
    {
      borderColor: ['rgba(236, 156, 156, 0.7)','rgba(172, 236, 156, 0.7)'],
      backgroundColor: ['rgba(236, 156, 156, 0.7)','rgba(172, 236, 156, 0.7)'],
    },
  ];


  constructor(private statsService: StatsService,
    private siteService: SiteService,
    private toastCtrl: ToastController,
   ) { }

  ngOnInit() {

    this.site = localStorage.getItem('site');
    this.getAllSites();
    // this.getNumberOfBlocked();
    this.getNumberOfNotBlocked();
    this.getNumberOfControledSite();
    this.getNumberOfcontroled();
    this.statsNbrTotal();
      // this.getAllStats();

    this.interval = setInterval(() => { 
        this.getAllSites();
        // this.getNumberOfBlocked();
        this.getNumberOfNotBlocked();
        this.getNumberOfControledSite();
        this.getNumberOfcontroled();
        this.statsNbrTotal();
  }, 60000*60);
 
    
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
        console.log('line chart stats : ',res.stats);
        this.lineChartData = [{ data: this.getChartData(res.stats), label: 'Camions Non Conforme' }];
        this.lineChartLabels = this.getChartLabels(res.stats);
      } else {
        this.messageLineChart = 'Aucun résultat';
      }
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
      //Benne
      this.bennes = res["bennes"];
      this.countbenneBlock = res["bennes"].map(x=> x.blockedCount).reduce((o,i)=>o+i);
      this.countbenneNotBlock = res["bennes"].map(x => x.notBlockedCount).reduce((o,i)=>o+i);
      console.log('NotBlockedBenne : ',this.countbenneNotBlock);
      //citerne
      this.citernes = res["citernes"];
      console.log('Citerne count :',res["citernes"].map(x=>x.blockedCount).reduce((o,i)=>o+i))
      this.countciternesBlock = res["citernes"].map(x=>x.blockedCount).reduce((o,i)=>o+i);
      this.countciternesNotBlock = res["citernes"].map(x => x.notBlockedCount).reduce((o,i)=>o+i);
      //Plateau
      this.plateaus = res["plateaus"];
      this.countplateausBlock = res["plateaus"].map(x=>x.blockedCount).reduce((o,i)=>o+i);
      this.countplateausNotBlock = res["plateaus"].map(x => x.notBlockedCount).reduce((o,i)=>o+i);
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

  statsNbrTotal() {
    this.statsService.getNbrTotal().subscribe((res: any) => {
      if (res.nonAutoriser && res.autoriser) {
        this.DoughnutChartData = [{ data: [this.getChartData(res.nonAutoriser),this.getChartData(res.autoriser)] }];
        this.DoughnutChartLabels = [this.getChartLabels(res.nonAutoriser),this.getChartLabels(res.autoriser)];
      }else {
        this.toastAlert('Aucune résultat');
      }
    });
  }

}


