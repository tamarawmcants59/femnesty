import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  returnUrl: string;
  errorMsg: string='';
  public loading = false;
  //public routerLinkVariable: string ='';

  constructor(
    private builder:FormBuilder, 
    private loginService: UserService, 
    private route: ActivatedRoute,
    private router: Router
  ) { 

    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      //'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    
  }

  /*email = new FormControl('', [Validators.required, Validators.minLength(5)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);

  loginForm: FormGroup = this.builder.group({
    email: this.email,
    password: this.password
  });*/

  ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public checkLogin(values:Object):void {
    this.submitted = true;
    this.loading = true;
   if (this.form.valid) {
     //console.log(values);
     //let loginJsonData={"email": this.email.value.toString(), "password": this.password.value.toString()};
     this.loginService.userLogin(values)
     .subscribe(data => {
                let details=data;
                //console.log(details);
                if (details.Ack=="1") {
                  //console.log(JSON.stringify(details.UserDetails));
                    localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
                    localStorage.setItem('isLoggedIn', '1');
                    //localStorage.setItem('isLoggedIn', '1');
                    localStorage.setItem('loginUserId', details.UserDetails.id);
                    localStorage.setItem('userName', details.UserDetails.first_name);
                    localStorage.setItem('profile_image', details.UserDetails.image_url);
                    //this.router.navigate(['/user/profile']);

                    // login successful so redirect to return url
                    this.router.navigateByUrl(this.returnUrl);
                    this.loading = false;
                    //return false;
                }else{
                  this.errorMsg=details.msg;
                  //alert(details.msg);
                  this.loading = false;
                  return false;
                }
            },
            error => {
              this.loading = false;
            }
          ); 
    } else{
        alert('INVALID FORM');
     }
  }

}
