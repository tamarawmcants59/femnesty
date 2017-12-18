import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider, SocialUser} from 'ng4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public forgotForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public forgotemail: AbstractControl;
  public submitted: boolean = false;
  public returnUrl: string;
  public errorMsg: string = '';
  public successMsg: string = '';
  public loading = false;
  public isLoggedIn: any;
  private socialUser: SocialUser;
  private loggedIn: boolean;
  public pageHeading: string = 'Login';

  constructor(
    private builder: FormBuilder,
    private loginService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    
    this.forgotForm = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      //console.log(user);
      this.loggedIn = (user != null);
    });

    if (this.isLoggedIn == 1) {
      //this.router.navigateByUrl(this.returnUrl);
      this.router.navigateByUrl('/user/profile');
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public checkLogin(values: Object): void {
    this.submitted = true;
    this.loading = true;
    if (this.form.valid) {
      this.loginService.userLogin(values)
        .subscribe(data => {
          const details = data;
          if (details.Ack === 1) {
            localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
            localStorage.setItem('isLoggedIn', '1');
            localStorage.setItem('loginUserId', details.UserDetails.id);
            localStorage.setItem('userName', details.UserDetails.first_name);
            localStorage.setItem('profile_image', details.UserDetails.image_url);
            if(details.UserDetails.user_type == 'CA' || details.UserDetails.user_type == 'CSA'){
              this.router.navigateByUrl('/company/profile');
            }else{
              //this.router.navigateByUrl(this.returnUrl);
              this.router.navigateByUrl('/social_home');
            }
            this.loading = false;
          } else {
            this.errorMsg = details.msg;
            this.loading = false;
            return false;
          }
        },
        error => {
          this.loading = false;
        }
        );
    } else {
      alert('INVALID FORM');
    }
  }
  
  public checkForgotPws(values: Object): void {
    this.submitted = true;
    this.loading = true;
    if (this.forgotForm.valid) {
      this.loginService.userForgotPwsLink(values).subscribe(data => {
          //console.log(data);
          this.errorMsg = '';
          this.successMsg = '';
          if (data.Ack == 1) {
            this.successMsg = data.msg;
            this.loading = false;
          } else {
            this.errorMsg = data.msg;
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
        });
    } else {
      alert('INVALID FORM');
    }
  }

  userForgotPws(){
    this.pageHeading='Forgot Password';
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signInWithLinkedIN(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }
}
