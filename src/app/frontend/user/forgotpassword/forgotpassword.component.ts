import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { UserService } from "../user.service";

function duplicatePassword(input: FormControl) {
  
    if (!this.input.root || !this.input.root.controls) {
      return null;
    }
  
    const exactMatch = this.input.root.controls.password.value === this.input.value;
    return exactMatch ? null : { mismatchedPassword: true };
}

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public form:FormGroup;
  public password:AbstractControl;
  public cpassword:AbstractControl;
  public loading = false;
  public isLoggedIn: any;
  public errorMsg: string = '';
  public successMsg: string = '';
  public userPIdEncode='';

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
      this.form = builder.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'cpassword': ['', Validators.compose([Validators.required])]
      });
      this.password = this.form.controls['password'];
      this.cpassword = this.form.controls['cpassword'];

      this.isLoggedIn=localStorage.getItem("isLoggedIn");
      if(this.isLoggedIn == 1){
          this.router.navigateByUrl('/user/edit_profile/activity');
      }
      
      this.activatedRoute.params.subscribe((params: Params) => {
          this.userPIdEncode = params['uid'];
          if(this.userPIdEncode == ''){
              this.router.navigateByUrl('/');
          }
      });
      
   }

  ngOnInit() {

  }


  public changePassword(values:Object):void {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    if (this.form.valid) {
      let signupJsonData={
        "id": this.userPIdEncode, 
        "pass": this.password.value.toString(),
      };
      this.dataService.userChangePassword(signupJsonData).subscribe(data => {
            let details=data;
            //console.log(data);
            if (details.Ack=="1") {
                this.loading = false;
                this.successMsg=details.msg;
            }else{
              this.errorMsg=details.msg;
              this.loading = false;
            }
            return false;
        },
        error => {
          this.loading = false;
        }); 
      } else{
          alert('INVALID FORM');
      }
    }
}
