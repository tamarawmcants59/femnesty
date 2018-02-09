import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider, SocialUser } from 'ng4-social-login';

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
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public cpassword: AbstractControl;
  public name: AbstractControl;
  public username: AbstractControl;
  public first_name: AbstractControl;
  public last_name: AbstractControl;
  public agreetab: AbstractControl;
  public privacyTab: AbstractControl;
  public mobile_number: AbstractControl;
  public occupation: AbstractControl;
  public dob: AbstractControl;
  month: AbstractControl;
  day: AbstractControl;
  year: AbstractControl;
  public submitted: boolean = false;
  returnUrl: string;
  errorMsg: string = '';
  public minDate = new Date();
  public loading = false;
  public checkEmailExist: boolean = false;
  public validAge = false;
  public isLoggedIn: any;
  private socialUser: SocialUser;
  private loggedIn: boolean;
  monthList = [];
  yearList = [];
  dayList = [];
  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'mobile_number': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('[0-9][0-9]+')])],
      'first_name': ['', Validators.compose([Validators.required, Validators.pattern('([a-zA-Z])+([a-zA-Z])+')])],
      'last_name': ['', Validators.compose([Validators.required, Validators.pattern('([a-zA-Z])+([a-zA-Z])+')])],
      'occupation': ['', Validators.compose([Validators.required, Validators.pattern('([a-zA-Z0-9])+([0-9a-zA-Z])+')])],
      'agreetab': ['', Validators.compose([Validators.required])],
      'privacyTab': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'cpassword': ['', Validators.compose([Validators.required])],
      'month': ['', Validators.compose([Validators.required])],
      'day': ['', Validators.compose([Validators.required])],
      'year': ['', Validators.compose([Validators.required])],
      // 'dob': ['', Validators.compose([Validators.required])]

    });
    this.prepareDropdown();
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.mobile_number = this.form.controls['mobile_number'];
    // this.name = this.form.controls['name'];
    this.first_name = this.form.controls['first_name'];
    this.last_name = this.form.controls['last_name'];
    this.occupation = this.form.controls['occupation'];
    this.agreetab = this.form.controls['agreetab'];
    this.privacyTab = this.form.controls['privacyTab'];
    this.cpassword = this.form.controls['cpassword'];
    this.year = this.form.controls['year'];
    this.month = this.form.controls['month'];
    this.day = this.form.controls['day'];
    // this.username = this.form.controls['username'];
    // this.dob = this.form.controls['dob'];
  }
  prepareDropdown() {
    this.monthList.push({ "text": "Jan", "id": "0" }); this.monthList.push({ "text": "Feb", "id": "1" }); this.monthList.push({ "text": "Mar", "id": "2" });
    this.monthList.push({ "text": "Apr", "id": "3" }); this.monthList.push({ "text": "May", "id": "4" }); this.monthList.push({ "text": "June", "id": "5" });
    this.monthList.push({ "text": "July", "id": "6" }); this.monthList.push({ "text": "Aug", "id": "7" }); this.monthList.push({ "text": "Sept", "id": "8" });
    this.monthList.push({ "text": "Oct", "id": "9" }); this.monthList.push({ "text": "Nov", "id": "10" }); this.monthList.push({ "text": "Dec", "id": "11" });



    this.dayList.push({ "text": "1", "id": "1" }); this.dayList.push({ "text": "2", "id": "2" }); this.dayList.push({ "text": "3", "id": "3" });
    this.dayList.push({ "text": "4", "id": "4" }); this.dayList.push({ "text": "5", "id": "5" }); this.dayList.push({ "text": "6", "id": "6" });
    this.dayList.push({ "text": "7", "id": "7" }); this.dayList.push({ "text": "8", "id": "8" }); this.dayList.push({ "text": "9", "id": "9" });
    this.dayList.push({ "text": "10", "id": "10" }); this.dayList.push({ "text": "11", "id": "11" }); this.dayList.push({ "text": "12", "id": "12" });
    this.dayList.push({ "text": "13", "id": "13" }); this.dayList.push({ "text": "14", "id": "14" }); this.dayList.push({ "text": "15", "id": "15" });
    this.dayList.push({ "text": "16", "id": "16" }); this.dayList.push({ "text": "17", "id": "17" }); this.dayList.push({ "text": "18", "id": "18" });
    this.dayList.push({ "text": "19", "id": "19" }); this.dayList.push({ "text": "20", "id": "20" }); this.dayList.push({ "text": "21", "id": "21" });
    this.dayList.push({ "text": "22", "id": "22" }); this.dayList.push({ "text": "23", "id": "23" }); this.dayList.push({ "text": "24", "id": "25" });
    this.dayList.push({ "text": "25", "id": "25" }); this.dayList.push({ "text": "26", "id": "26" }); this.dayList.push({ "text": "27", "id": "27" });
    this.dayList.push({ "text": "28", "id": "28" }); this.dayList.push({ "text": "29", "id": "29" }); this.dayList.push({ "text": "30", "id": "30" });
    this.dayList.push({ "text": "31", "id": "31" });
  }
  ngOnInit() {

    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    if (this.isLoggedIn == 1) {
      //this.router.navigateByUrl(this.returnUrl);
      this.router.navigateByUrl('/user/edit_profile/activity');
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      //console.log(user);
      this.loggedIn = (user != null);
    });

  }
  public calculateAge(event, type) {
    var IsCheck = false;
    if (type == 'y') {
      if (this.form.controls['month'].value && this.form.controls['day'].value) {
        IsCheck = true;
      }
    }
    else if (type == 'm') {
      if (this.form.controls['year'].value && this.form.controls['day'].value) {
        IsCheck = true;
      }
    }
    else if (type == 'd') {
      if (this.form.controls['year'].value && this.form.controls['month'].value) {
        IsCheck = true;
      }
    }
    if (IsCheck) {
      var birthday;
      if (type == 'y') {
        birthday = event + "/" + this.form.controls['month'].value + "/" + this.form.controls['day'].value;
      }
      else if (type == 'm') {
        birthday = this.form.controls['year'].value + "/" + event + "/" + this.form.controls['day'].value;
      }
      else if (type == 'd') {
        birthday = this.form.controls['year'].value + "/" + this.form.controls['month'].value + "/" + event;
      }

      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age >= 16) {
        this.validAge = true;
      }
      else {
        this.validAge = false;
      }
    }

  }
  public checkEmail(values: Object): void {
    if (values != '') {
      let signupCheckEmail = {
        "email": values
      };
      this.dataService.userCheckEmail(signupCheckEmail)
        .subscribe(data => {
          let details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.checkEmailExist = false;
            return false;
          } else {
            //alert('Invalid login');
            this.checkEmailExist = true;
            return false;
          }
        },
        error => {

        }
        );
    } else {

    }
  }

  public checkSignup(values: Object): void {
    this.submitted = true;
    this.loading = true;
    if (this.form.valid) {
      const dateOfBirth = this.dob.value.getFullYear() + '-' + ('0' + (this.dob.value.getMonth() + 1)).slice(-2) + '-'
        + ('0' + this.dob.value.getDate()).slice(-2);
      let signupJsonData = {
        "email": this.email.value.toString(),
        "txt_password": this.password.value.toString(),
        "name": this.first_name.value.toString() + " " + this.last_name.value.toString(),
        "mobile_number": this.mobile_number.value.toString(),
        "occupation": this.occupation.value.toString(),
        'dob': dateOfBirth
      };

      this.dataService.userSignup(signupJsonData)
        .subscribe(data => {
          let details = data;
          if (details.Ack == "1") {
            this.loading = false;
            localStorage.setItem('signupSuccessMsg', 'You have successfully signup.Please check your email to activate your account.');
            this.router.navigate(['/user/login']);
            return false;
          } else {
            //alert('Invalid login');
            this.errorMsg = details.msg;
            this.loading = false;
            window.scrollTo(0, 0);
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
