import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  roles;
  sites;
  constructor(private siteService: SiteService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastCtrl:ToastController) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      idRole: ['', Validators.required],
      idSite: ['', Validators.required],
      // societe:['',Validators.required]
    });
    this.roleService.getRoles().subscribe(res => {
      if (res) {
        this.roles = res;
      }
    });
    this.siteService.getSites().subscribe(res => {
      if (res) {
        this.sites = res;
      }
    })
  }
  Adduser(form) {
    if (!form.valid) {
      return;
    }
    console.log(form.value);
    this.userService.addUsers(form.value).subscribe(async (res) => {
      this.toastAlert("Bien ajouter ");
      await this.userService.getAllUser().pipe(take(1)).toPromise().then(users => {
        this.dataService.changeUserDataSource(users);
      });
    });
    this.userForm.reset();
    this.navigateTo();
  }

  async toastAlert(msg) {
    const toast = await this.toastCtrl.create({
      message: `${msg}`,
      duration: 2000,
      color: 'success'
    });

    toast.present();
  }
  navigateTo() {
    this.router.navigate(['admin', { outlets: { admin: ['user'] } }]);
  }

}
