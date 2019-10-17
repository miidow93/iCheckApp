import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {}

  goToSynthese() {
    console.log('Test');
    this.router.navigate([{ outlets: { admin: ['synthese'] } }], {relativeTo: this.route});
  }

  goToEngin() {
    console.log('Engin');
    this.router.navigate([{ outlets: { admin: ['engin'] } }], {relativeTo: this.route});
  }
}
