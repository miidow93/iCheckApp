import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { Router } from '@angular/router';
import { Icons } from 'src/app/shared/icons';
import { AuthServices } from 'src/app/core/services/auth/auth.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user/user.service';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData: any[] = [];
  resultMessage: string;
  img_Holcim = Icons.img_Holcim;
  // logoVisiteur = constants.img_OurVisitor;
  // img_Cms = constants.img_Cms;
  loginForm: FormGroup;
  username = '';
  password = '';
  matcher = new FormErrorStateMatcher();
  isLoadingResults = false;
  message = '';
  iCheckLogo = Icons.iCheckLogo;
  userIcon = Icons.userIcon;
  passwordIcon = Icons.passwordIcon;

  userGoogle = faUserCheck;
  listUser;

  /*, @Inject(LOCALE_ID) public locale: string*/

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServices,
    private socialAuthServ: AuthService,
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    // console.log('Locale: ', this.locale);
    // this.router.navigate(['checklist', 'benne']);
    this.getAllUser()
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required/*, Validators.minLength(6)*/]],
      password: [null, [Validators.required/*, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$')*/]]
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe((res) => {
      this.listUser = res
      console.log('liste user : ', this.listUser)
    })
  } 



  onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        console.log('Login: ', res);
        if (res.message) {
          this.message = res.message;
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('site', res.site);
          localStorage.setItem('username', res.username);
          localStorage.setItem('nomComplet', res.nomComplet);
          localStorage.setItem('id', res.id);
          if (res.role) {
            localStorage.setItem('role', res.role);
            if (res.role === 'admin') {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['engins']);
            }
          }
        }
      }, err => console.log('Error: ', err));
  }
  user;

  signInGoogle(platform) {
    platform = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthServ.signIn(platform).then((res: any) => {
      this.user = res;
      console.log('google : ', this.user.email)

      if (this.listUser.find(x => x.email == this.user.email)) {
        if (this.user != null) {
          this.router.navigate(['admin'])
        }
      } else {
        this.toastAlert('Votre email est invalide');
      }

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
