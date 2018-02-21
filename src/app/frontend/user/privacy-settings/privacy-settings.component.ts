import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";


@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css']
})
export class PrivacySettingsComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  returnUrl: string;
  errorMsg: string = '';
  successMsg: string = '';
  public name_visible: any;
  public name_visible_in_search_engine: any;
  public found_email_address: any;
  public found_phone_number: any;
  public profile_picture_picture: any;
  public dob_visible: any;
  public email_visible: any;
  public phone_visible: any;
  public allow_connetion: any;
  public all_post: any;
  public group_visible: any;
  public hub_visible: any;
  public photo_visible: any;
  public see_connection_list: any;
  public name_visible_book_review: any;
  public get_value:object={};
  public block_user:any;


  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = builder.group({
      'name_visible': [''],
      'name_visible_in_search_engine': [''],
      'found_email_address': [''],
      'found_phone_number': [''],
      'profile_picture_picture': [''],
      'dob_visible': [''],
      'email_visible': [''],
      'phone_visible': [''],
      'allow_connetion': [''],
      'all_post': [''],
      'group_visible': [''],
      'hub_visible': [''],
      'photo_visible': [''],
      'see_connection_list': [''],
      'name_visible_book_review': [''],
    });
   
    this.name_visible = this.form.controls['name_visible'];
    this.name_visible_in_search_engine = this.form.controls['name_visible_in_search_engine'];
    this.found_email_address = this.form.controls['found_email_address'];
    this.found_phone_number = this.form.controls['found_phone_number'];
    this.profile_picture_picture = this.form.controls['	profile_picture_picture'];
    this.dob_visible = this.form.controls['dob_visible'];
    this.email_visible = this.form.controls['email_visible'];
    this.phone_visible = this.form.controls['phone_visible'];
    this.allow_connetion = this.form.controls['allow_connetion'];
    this.all_post = this.form.controls['all_post'];
    this.group_visible = this.form.controls['group_visible'];
    this.hub_visible = this.form.controls['hub_visible'];
    this.photo_visible = this.form.controls['photo_visible'];
    this.see_connection_list = this.form.controls['see_connection_list'];
    this.name_visible_book_review = this.form.controls['name_visible_book_review'];

  }

  ngOnInit() {
  this.get_privacy_setting();
  this.get_block_list();
  }


  

public hello(value){
  const loginUserId = localStorage.getItem("loginUserId");
  value.user_id = loginUserId;
 this.dataService.userPrivacy(value)
        .subscribe(data => {
          this.successMsg='You have successfully updated your privacy setting.';
        },
        error => {
          this.loading = false;
        }
        );
}

public get_privacy_setting(){ 
  const loginUserId = localStorage.getItem("loginUserId");
 // alert(loginUserId)
 
  const dataUserDet = {
    "id": loginUserId,
    
  };
 this.dataService.getuserPrivacy(dataUserDet)
        .subscribe(data => {
          if(data.Ack == 1)
          {
            this.get_value = data.user_privacy;
          }
          else{ 
            this.get_value = {
              "name_visible": "1",
             "name_visible_in_search_engine": "1",
              "found_email_address": "1",
              "found_phone_number": "1",
               "profile_picture_picture":"1",
             "dob_visible": "1",
              "email_visible": "1",
               "phone_visible": "1",
              "allow_connetion":"1",
             "all_post":"1",
              "group_visible":"1",
               "hub_visible": "1",
               "photo_visible":"1",
               "see_connection_list":"1",
               "name_visible_book_review": "1"
            };
          }
          
        },
        error => {
          this.loading = false;
        }
        );
}

public get_block_list(){ 
  const loginUserId = localStorage.getItem("loginUserId");
 // alert(loginUserId)
 
  const dataUserDet = {
    "id": loginUserId,
    
  };
 this.dataService.getblock_list(dataUserDet)
        .subscribe(data => {
          if(data.Ack == 1)
          {
            this.block_user = data.block_user;
            console.log(this.block_user)
          }
          else
          {
            
          }
          
        },
        error => {
          this.loading = false;
        }
        );
}



public unblock_user(id){ 
  
  const dataUserDet = {
    "id": id,
    
  };
 this.dataService.unblock_user(dataUserDet)
        .subscribe(data => {
          if(data.Ack == 1)
          {
            this.get_block_list()
          }
          else
          {
            
          }
          
        },
        error => {
          this.loading = false;
        }
        );
}

}
