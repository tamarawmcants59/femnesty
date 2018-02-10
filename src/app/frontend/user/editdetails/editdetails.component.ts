import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { UserService } from "../user.service";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editdetails',
  templateUrl: './editdetails.component.html',
  styleUrls: ['./editdetails.component.css']
})
export class EditdetailsComponent implements OnInit {
  public loginUserDet: any;
  public form: FormGroup;
  qtd: any = [];
  public editAbtActiveTab: string = '';
  errorMsg: string = '';
  successMsg: string = '';
  public loading = false;
  public accountSettings: any = [];
  noti_settings: any;
  public dobmonth: any;
  public dobyear: any;
  public dobdate: any;

  public mobnumber: any;
  public mobcode: any;
  validAge = true;
  dayList = [];


  constructor(
    private modalService: NgbModal,
    private builder: FormBuilder,
    private dataService: UserService,
    private router: Router,
  ) {
    this.form = builder.group({
      first_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      last_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
			/*email: ['', [
				Validators.required,
				//BasicValidators.email
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]],*/
      mobcode: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      mobnumber: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      dobmonth: ['', [
        Validators.required,
      ]],
      dobyear: ['', [
        Validators.required,
      ]],
      dobdate: ['', [
        Validators.required,
      ]],
      website: ['', [

      ]],
			/*dob: ['', [
			   Validators.required,
			   Validators.minLength(3)
			 ]],
			country: ['', [
			   Validators.required,
			   Validators.minLength(3)
			 ]],*/
      state: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      occupation: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]],
      bio: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      email: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      education: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      favourite_quotes: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      marriage_status: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      children: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      // user_settings: ['', [
      //   //Validators.required,
      //   //Validators.minLength(3)
      // ]],
      password: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      cnfpassword: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
    });
    this.dataService.getEmailNotficationSettings().subscribe(data => {
      if (data.Ack == 1) {
        this.accountSettings = data.NotiSettings;
      }
    }, error => {
      console.log(error);
    })
  }
  checkChange(id, event) {
    if (!this.noti_settings) {
      this.noti_settings = [];
    }
    var isFound = false;
    var index;
    if (this.noti_settings.length > 0) {
      for (var i = 0; i < this.noti_settings.length; i++) {
        if (this.noti_settings[i] == id) {
          index = i;
          isFound = true;
          break;
        }
      }
    }
    if (!isFound) {
      this.noti_settings.push(id);
    }
    else {
      if (index) {
        //var newValue = this.noti_settings.pop(index);
        var newArray = [];
        for (var i = 0; i < this.noti_settings.length; i++) {
          if (i != index) {
            newArray.push(this.noti_settings[i]);
          }
        }
        this.noti_settings = newArray;
      }
      else if (index == 0) {
        var newArray = [];
        for (var i = 0; i < this.noti_settings.length; i++) {
          if (i != 0) {
            newArray.push(this.noti_settings[i]);
          }
        }
        this.noti_settings = newArray;
      }
    }




  }
  ngOnInit() {
    this.getUserDetails();
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
  public calculateAge(event, type) {
    var IsCheck = false;
    if (type == 'y') {
      if (this.dobdate && this.dobmonth) {
        IsCheck = true;
      }
    }
    else if (type == 'm') {
      if (this.dobdate && this.dobyear) {
        IsCheck = true;
      }
    }
    else if (type == 'd') {
      if (this.dobmonth && this.dobyear) {
        IsCheck = true;
      }
    }
    if (IsCheck) {
      var birthday;
      if (type == 'y') {
        birthday = this.dobyear + "/" + this.dobmonth + "/" + this.dobdate;
      }
      else if (type == 'm') {
        birthday = this.dobyear + "/" + this.dobmonth + "/" + this.dobdate;
      }
      else if (type == 'd') {
        birthday = this.dobyear + "/" + this.dobmonth + "/" + this.dobdate;
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
  report(closeConfirmModal) {
    this.modalService.open(closeConfirmModal);
  }
  public getUserDetails() {
    const loginUserId = localStorage.getItem("loginUserId");
    localStorage.setItem("groupAdmin", loginUserId);
    if (loginUserId != '') {
      const dataUserDet = {
        "id": parseInt(loginUserId)
      };
      this.dataService.getUserDetById(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.loginUserDet = details.UserDetails[0];
            if (this.loginUserDet.dob) {

              var res = this.loginUserDet.dob.split("-");
              this.dobmonth = res[1]
              this.dobyear = res[0]
              this.dobdate = res[2]
              //alert(res[0])
              //this.loginUserDet.dateOfBirth = new Date(this.loginUserDet.dob);
            }

            if (this.loginUserDet.noti_settings) {
              var newArray = this.loginUserDet.noti_settings;
              setTimeout(function () {

                $('[id^="styled-checkbox-"]').each(function () {
                  var number = this.id.split('_').pop();
                  number=number.split('-')[2];
                  if (newArray.includes(number)) {
                    $(this).prop('checked', true);
                  }

                });

              }, 100);
            }
            if (this.loginUserDet.mobile_number) {
              //alert(this.loginUserDet.mobile_number)
              var res = this.loginUserDet.mobile_number.split("-");
              if (this.mobnumber = res[1]) {
                this.mobnumber = res[1]
                this.mobcode = res[0]
              }
              else {
                this.mobnumber = res[0]
                this.mobcode = '+00';
              }


            }
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }
  public updateAccount() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
      userValue = this.form.value;
    userValue.id = loginUserId;
    const dateOfBirth = this.form.value.dobyear + '-' + this.form.value.dobmonth + '-' + this.form.value.dobdate;
    const mobile = this.form.value.mobcode + '-' + this.form.value.mobnumber;
    userValue.mobile_number = mobile;
    //alert(JSON.stringify(userValue))
    userValue.dob = dateOfBirth;
    if (this.noti_settings && this.noti_settings.length) {
      this.noti_settings = this.noti_settings.toString();
      userValue.noti_settings = this.noti_settings;
    }
    else {
      userValue.noti_settings = "";
    }
    this.dataService.updateAccountDet(userValue)
      .subscribe(
      data => {
        this.editAbtActiveTab = '';
        const details = data;
        //console.log
        localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        this.loginUserDet.dob = dateOfBirth;
        //this.router.navigateByUrl('/user/profile');
        this.router.navigate(['/user/edit_details']);
      },
      error => {
        alert(error);
      });

  }
}
