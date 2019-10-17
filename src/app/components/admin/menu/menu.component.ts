import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { faTruck, faClipboardList, faTruckLoading, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  faTruck = faTruck;
  faClipboardList = faClipboardList;
  faTruckLoading = faTruckLoading;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  role;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private router: Router
  ) {}
  ngOnInit() {
    this.role = localStorage.getItem('role');
  }
  logout() {
    const cfm = confirm('Voulez-vous déconnecter ??');
    if (cfm) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token) {
        console.log('Logout: ', token);
        localStorage.removeItem('token');
        if (role) {
          console.log('Logout role: ', role);
          localStorage.removeItem('role');
        }
      }
      this.router.navigate(['login']);
    } else {
      return;
    }
  }

  
}