import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
//import { AuthService } from "angular2-social-login";

function duplicatePassword(input: FormControl) {
  
    if (!this.input.root || !this.input.root.controls) {
      return null;
    }
  
    const exactMatch = this.input.root.controls.password.value === this.input.value;
    return exactMatch ? null : { mismatchedPassword: true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public cpassword:AbstractControl;
  public name:AbstractControl;
  public agreetab:AbstractControl;
  public mobile_number:AbstractControl;
  public occupation:AbstractControl;
  public submitted:boolean = false;
  returnUrl: string;
  errorMsg: string='';
  public loading = false;
  public checkEmailExist:boolean = false;
  public isLoggedIn: any;

  /*public authServerBaseUrl = 'https://cuppa-angular2-oauth.herokuapp.com';
  public config = {
  "loginRoute":"user/signup",
  "linkedin":{
    "authEndpoint": this.authServerBaseUrl+"/auth/linkedin",
    "clientId":"8176r44lz2ewos",
    "redirectURI" : "https://cuppa-angular2-oauth.herokuapp.com/admin"
  },
  "facebook":{
    "authEndpoint": this.authServerBaseUrl+"/auth/facebook",
    "clientId":"150470825593599",
    "redirectURI" : "https://cuppa-angular2-oauth.herokuapp.com/admin"
  },
  "google":{
    "authEndpoint": this.authServerBaseUrl+"/auth/google",
    "clientId":"77954512562-eftl8up04q1g3aha2mjg5h6bgel9svkk.apps.googleusercontent.com",
    "redirectURI" : "https://cuppa-angular2-oauth.herokuapp.com/admin"
  }
  };*/

  constructor(
    private builder:FormBuilder, 
    private dataService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    //public _auth: AuthService
  ) { 
    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'mobile_number': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'name': ['', Validators.compose([Validators.required])],
      'occupation': ['', Validators.compose([Validators.required])],
      'agreetab': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'cpassword': ['', Validators.compose([Validators.required])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.mobile_number = this.form.controls['mobile_number'];
    this.name = this.form.controls['name'];
    this.occupation = this.form.controls['occupation'];
    this.agreetab = this.form.controls['agreetab'];
    this.cpassword = this.form.controls['cpassword'];
  }

  ngOnInit() {
    this.isLoggedIn=localStorage.getItem("isLoggedIn");
    if(this.isLoggedIn == 1){
      //this.router.navigateByUrl(this.returnUrl);
      this.router.navigateByUrl('/user/profile');
    }
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  public checkEmail(values:Object):void {
    if(values!=''){
      let signupCheckEmail={
        "email": values
      };
      this.dataService.userCheckEmail(signupCheckEmail)
      .subscribe(data => {
             let details=data;
             //console.log(details);
             if (details.Ack=="1") {
                 this.checkEmailExist = false;
                 return false;
             }else{
               //alert('Invalid login');
               this.checkEmailExist = true;
               return false;
             }
         },
         error => {
           
         }
       ); 
    }else{

    }
  }

  public checkSignup(values:Object):void {
    this.submitted = true;
    this.loading = true;
   if (this.form.valid) {
     //console.log(values);
     let signupJsonData={
       "email": this.email.value.toString(), 
       "txt_password": this.password.value.toString(),
       "name": this.name.value.toString(),
       "mobile_number": this.mobile_number.value.toString(),
       "occupation": this.occupation.value.toString()
      };
     this.dataService.userSignup(signupJsonData)
     .subscribe(data => {
            let details=data;
            if (details.Ack=="1") {
                this.loading = false;
                this.router.navigate(['/user/login']);
                return false;
            }else{
              //alert('Invalid login');
              this.errorMsg=details.msg;
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

  public socialSignIn(provider){
    // this._auth.login(provider).subscribe(
    //   (data) => {
    //       console.log(data);
    //       //user data 
    //       //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google) 
    //     }
    // )
  }

}
