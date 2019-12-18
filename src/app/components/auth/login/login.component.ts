import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { Router } from '@angular/router';
import { Icons } from 'src/app/shared/icons';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthServices } from 'src/app/core/services/auth/auth.service';
// import { Constants } from 'src/app/shared/constants';

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

  /*, @Inject(LOCALE_ID) public locale: string*/

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServices, private authServ: AuthService) { }

  ngOnInit() {
    // console.log('Locale: ', this.locale);
    // this.router.navigate(['checklist', 'benne']);
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required/*, Validators.minLength(6)*/]],
      password: [null, [Validators.required/*, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$')*/]]
    });
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
  logInWithGoogle(platform: string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    //Sign In and get user Info using authService that we just injected
    this.authServ.signIn(platform).then(
      (response) => {
        //Get all user details
        console.log(platform + ' logged in user data is= ', response);
        //Take the details we need and store in an array
        this.userData.push({
          UserId: response.id,
          Provider: response.provider,
          FirstName: response.firstName,
          LastName: response.lastName,
          EmailAddress: response.email,
          PictureUrl: response.photoUrl
        });
      },
      (error) => {
        console.log(error);
        this.resultMessage = error;
      });
  }
}
