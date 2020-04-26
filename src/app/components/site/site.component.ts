import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastController } from '@ionic/angular';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { SiteService } from 'src/app/core/services/site/site.service';
import { Icons } from 'src/app/shared/icons';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  siteForm:FormGroup;
  displayedColumns: string[] = ['site'];
  dataSource = new MatTableDataSource();
  faEdit = faEdit;
  lhmIcon = Icons.lhmIcon;
  constructor(private siteService:SiteService,
    private formBuilder:FormBuilder,
    private toastCtrl:ToastController) { }

  ngOnInit() {
    this.siteForm = this.formBuilder.group({
      libelle:['',Validators.required]
    });
    this.getAllSite();
  }

  onSubmit(form){
    if(!form.valid){
      return;
    }
    console.log('formulaire value : ',form.value)
    this.siteService.postSite(form.value).subscribe(res => 
      {
        console.log('bien ajouter : ',res);
        this.toastAlert('Bien ajouter');
        this.getAllSite();
      })
  }

  getAllSite(){
    this.siteService.getAllSites().subscribe((res : any)=>{
      console.log('data site : ',res);
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    }
    )
  }

  async toastAlert(msg) {
    const toast = await this.toastCtrl.create({
      message: `${msg}`,
      duration: 2000,
      color: 'success'
    });

    toast.present();
  }


}
