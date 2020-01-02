import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { SiteService } from 'src/app/core/services/site/site.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  editFormUser: FormGroup;
  roles = [];
  sites = [];
  selectedRoleID = 1;
  selectedSiteID = 1;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private userService: UserService,
    private roleService: RoleService,
    private siteService: SiteService,
  ) { }

  ngOnInit() {

    console.log('Passed Data: ', this.data);
    this.editFormUser = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      idRole: ['', Validators.required],
      idSite: ['', Validators.required],
      // societe:['',Validators.required]
    });
    
    this.initializeFormData();
    this.roleService.getRoles().subscribe((res: any) => {
      if (res) {
        this.roles = res;
        console.log('Roles: ', res);
        this.selectedRole();
      }
    });

    this.siteService.getSites().subscribe((res: any) => {
      if (res) {
        this.sites = res;
        console.log('Sites: ', res);
        this.selectedSite();
      }
    });

  }

  initializeFormData() {
    this.editFormUser.controls['nomComplet'].patchValue(this.data.user.nomComplet);
    this.editFormUser.controls['userName'].patchValue(this.data.user.username);
    this.editFormUser.controls['password'].patchValue(this.data.user.password);
    this.editFormUser.controls['idRole'].patchValue(this.data.user.role);
    this.editFormUser.controls['idSite'].patchValue(this.data.user.site);
  }

  selectedRole() {
    if(this.data.user.role != null){
      this.selectedRoleID = this.roles.find(x => x.libelle === this.data.user.role).id;
   
    }
     console.log('Selected ID: ', this.selectedRoleID);
  }
  selectedSite(){
    if(this.data.user.site){
          this.selectedSiteID = this.sites.find(x => x.libelle === this.data.user.site).id;
    }
    console.log('delected Site ID : ',this.selectedSiteID);
  }

  editUser(form) {
    if (!form.valid) {
      return;
    }
    const userEdit = {
      id: this.data.user.id,
      nomComplet: form.controls['nomComplet'].value,
      userName: form.controls['userName'].value,
      password: form.controls['password'].value,
      idRole: form.controls['idRole'].value,
      idSite: form.controls['idSite'].value,
    }
    this.userService.updateUser(this.data.user.id, userEdit).subscribe(res => {
      console.log('Ajout : ', res)
    });
    this.editFormUser.reset();
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
