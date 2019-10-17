import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { faTruck, faClipboardList, faTruckLoading, faUser } from '@fortawesome/free-solid-svg-icons';
import { Icons } from 'src/app/shared/icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  {

  constructor(private route: ActivatedRoute, private router: Router) { }
  faTruck = faTruck;
  faClipboardList = faClipboardList;
  faTruckLoading = faTruckLoading;
  faUser = faUser;


  conducteurIcon = Icons.conducteurIcon;
  enginIcon = Icons.enginIcon;
  syntheseIcon = Icons.syntheseIcon;

  goToSynthese() {
    console.log('Test');
    this.router.navigate([{ outlets: { admin: ['synthese'] } }], {relativeTo: this.route});
  }

  goToEngin() {
    console.log('Engin');
    this.router.navigate([{ outlets: { admin: ['engin'] } }], {relativeTo: this.route});
  }
}
