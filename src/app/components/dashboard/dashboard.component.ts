import { Component, OnInit } from '@angular/core';
import { BaseChartDirective, Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { StatsService } from 'src/app/core/services/stats/stats.service';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { Icons } from 'src/app/shared/icons';
import { ToastController } from '@ionic/angular';
import * as __ from 'lodash';
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
  // blockedSite = [];
  // notBlockedSite = [];
  // controledSite = [];
  // blocked;
  // NotBlocked;
<<<<<<< HEAD
  bennes = { 'blocked': [], 'notBlocked': []};
  citernes = [];
  plateaus = {'blocked': [], 'notBlocked': []};

=======
  bennes = [];
  citernes = [];
  plateaus = { 'blocked': [], 'notBlocked': [] };
  data = {};
  all = [];
>>>>>>> 8db51ce8b23b08b087b3bab13fff9babf41cf158
  Controled;
  benneIcon = Icons.benneIcon;
  plateauIcon = Icons.plateauIcon;
  citerneIcon = Icons.citerneIcon;
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
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.site = localStorage.getItem('site');
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
    return this.statsService.getNumberOfBlocked().subscribe((res: any) => {
      console.log('Blocked: ', res);
      for (let i = 0; i < res.stats.length; i++) {
        // this.blockedSite.push(res.stats[i])
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

<<<<<<< HEAD
  // getAllStats() {
  //   this.statsService.getStats().subscribe((res: any) => { 
  //     this.bennes = {
  //       'blocked': res['blocked'].filter(x => x.type === 'Benne'),
  //       'notBlocked': res['notBlocked'].filter(x => x.type === 'Benne')
  //     };

  //     this.plateaus = {
  //       'blocked': res['blocked'].filter(x => x.type === 'Plateau'),
  //       'notBlocked': res['notBlocked'].filter(x => x.type === 'Plateau')
  //     };

  //     this.citernes = {
  //       'blocked': res['blocked'].filter(x => x.type === 'Citerne'),
  //       'notBlocked': res['notBlocked'].filter(x => x.type === 'Citerne')
  //     }
  //     console.log('Get All Stats: ', res);
  //     console.log('Benne: ', this.bennes);
  //     console.log('Citerne: ', this.citernes);
  //    });
  // }
=======
  getAllStats() {
    this.statsService.getStats().subscribe((res: any) => {
      const allData = res['stats'];
      this.bennes = allData.filter(x => x.type === 'Benne').map(s => {
        const data = { label: s.label, type: s.type };
        if (s.etat === 'blocked') {
          data['blockedCount'] = s.count;
        } else {
          data['notBlockedCount'] = s.count;
        }
        return data;
      });

      this.plateaus = allData.filter(x => x.type === 'Plateau').map(s => {
        const data = { label: s.label, type: s.type };
        if (s.etat === 'blocked') {
          data['blockedCount'] = s.count;
        } else {
          data['notBlockedCount'] = s.count;
        }
        return data;
      });

      this.citernes = allData.filter(x => x.type === 'Citerne');

      // const data = res['blocked'].concat(res['notBlocked']);

      console.log('Get All Stats: ', res);
      const result = this.bennes.filter(x => x.label === 'Oujda').map(s => s).reduce((unique, item) => {
        console.log('Unique: ', unique);
        console.log('Item : ', item);
        return Object.assign({}, unique, item);
      }, []);

      console.log('Result: ', result);
      // console.log('Plateaus: ', this.plateaus);
      console.log('bennes: ', this.bennes);
      const sorted = this.bennes.sort((a, b) => {
        const label1 = a.label.toUpperCase();
        const label2 = b.label.toUpperCase();
        if (label1 < label2) {
          return -1;
        }
        if (label1 > label2) {
          return 1;
        }

        return 0;
      }).map(s => {
        this.all.push(s);
        console.log('Push All: ', this.all);
        for (let i = 0; i < this.all.length; i++) {
          if (i !== 0) {
            if (this.all[i].label === this.all[i-1].label) {
              this.all[i-1].slice();
              this.data = { ...this.all[i], ...this.all[i-1] };
            }
          }
        }
        return this.data;
      });
      console.log('Sort: ', sorted);
      console.log('Citernes: ', this.citernes);
      console.log('Citernes Sort: ', this.citernes.sort(x => x.label));
      // console.log('Merge: ', data);
    });
  }
>>>>>>> 8db51ce8b23b08b087b3bab13fff9babf41cf158

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


