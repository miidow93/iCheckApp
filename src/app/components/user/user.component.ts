import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { SiteService } from 'src/app/core/services/site/site.service';

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
    private roleService: RoleService) { }

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
    console.log(form.value);
    this.userService.addUsers(form.value).subscribe();
    this.userForm.reset();
  }

}
