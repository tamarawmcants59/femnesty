import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from "../company.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public mobile_number:AbstractControl;
  public company_name:AbstractControl;
  public website:AbstractControl;
 // public company_type:AbstractControl;
  public agreetab:AbstractControl;
  public cpassword:AbstractControl;
  public checkEmailExist:boolean = false;
  public checkCompanynameExist = false;
  public domainmatch = false;
  public domainmatch1 = false;
  public submitted:boolean = false;
  returnUrl: string;
  errorMsg: string='';
  public loading = false;
  public isLoggedIn: any;
  public user_id:string;
  //public disableSignup = true;

  constructor(
    private builder:FormBuilder, 
    private dataService: CompanyService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'mobile_number': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'company_name': ['', Validators.compose([Validators.required])],
      //'website': ['', Validators.compose([Validators.required,Validators.pattern('https?://.+')])],
      'website': ['', Validators.compose([Validators.required])],
      //'company_type': ['', Validators.compose([Validators.required])],
      'agreetab': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'cpassword': ['', Validators.compose([Validators.required])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.mobile_number = this.form.controls['mobile_number'];
    this.company_name = this.form.controls['company_name'];
    this.website = this.form.controls['website'];
    
    //this.company_type = this.form.controls['compant_type'];
    this.agreetab = this.form.controls['agreetab'];
    this.cpassword = this.form.controls['cpassword'];
   }

  ngOnInit() {

  }

  public checkEmail(values:Object):void { 
    if(values!=''){
      let signupCheckEmail={
        "email": values,
        "company_name": this.company_name.value,
        "website" : this.website.value
      };
      this.dataService.userCheckEmail(signupCheckEmail).subscribe(data => {
             let details=data;
             //console.log(details);
             if(details.domain_match == "1")
             {
              this.domainmatch = true;
              this.domainmatch1 = true;
             }else {
              this.domainmatch = false;
              this.domainmatch1 = false;
             }

             if (details.Ack=="1") {
                 this.checkEmailExist = true;
                 //return false;
             }else{
               //alert('Invalid login');
               this.checkEmailExist = false;
               //return false;
             }
         },
         error => {
           console.log('err');
         }
       ); 
    }else{

    }
  }

public checkCompanyname(values:Object){
  //alert(this.email.value);
  if(values!=''){
    
    let signupCheckcompanyname={"company_name": values,"email":this.email.value,"website":this.website.value};
//console.log(signupCheckcompanyname);
    this.dataService.userCheckCompanyname(signupCheckcompanyname).subscribe(data => {
           let details=data;
           //console.log(data);
          if(details.Ack=="1") {
               this.checkCompanynameExist = false;
               //return false;
           }else{
             //alert('Invalid login');
             this.checkCompanynameExist = true;
            // return false;
           }
       },
       error => {
        console.log('details');
       }
     ); 
  }else{
    //this.disableSignup=true;
  }
}

public checkCompanyurl(values:Object){
  //alert(this.email.value);
  if(values!=''){
    
    let signupCheckcompanyurl={"company_name": this.company_name.value,"email":this.email.value,"website":values};
//console.log(signupCheckcompanyname);
    this.dataService.userCheckCompanyurl(signupCheckcompanyurl).subscribe(data => {
           let details=data;
           //console.log(data);
           if(details.domain_match == "1")
           {
            this.domainmatch1 = true;
            this.domainmatch = true;
           }
           else{
            this.domainmatch1 = false;
            this.domainmatch = false;
             //return false;
           }
       },
       error => {
        console.log('details');
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
     this.user_id =localStorage.getItem("isLoggedIn");
     let signupJsonData={
       "email": this.email.value.toString(), 
       "txt_password": this.password.value.toString(),
       "company_name": this.company_name.value.toString(),
       "website": this.website.value.toString(),
       "mobile_number": this.mobile_number.value.toString(),
       "company_uid": this.user_id       
      };

     this.dataService.companySignup(signupJsonData)
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
        //alert('INVALID FORM');
        
     }
  }
}
