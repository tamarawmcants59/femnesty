import { Component, OnInit, Input, SimpleChanges,SimpleChange } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from "../../frontend/company/company.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var google: any;

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.css']
})
export class AboutCompanyComponent implements OnInit {
  public aboutActiveTab: string = 'edit_details';
  public adminform: FormGroup;
  public form: FormGroup;
  public loading = false;
  public loginUserDet: object = {};
  public publicCmpDet: object = {};
  public isCompanyId: number;
  private _name:number;
  errorMsg: string = '';
  successMsg: string = '';
  public editAbtActiveTab: string = '';
  public searchData = { address: '', lat: '', lng: '' };
  public cmpSubadminList = [];
  public editSubAdminId: string = '';
  public editSubAdmindata: object = {
    email: '',
    txt_password: '',
    name: '',
    state: '',
    city: '',
    address: '',
    company_mission: '',
    company_vission: ''
  };
  public checkEmailExist: boolean = false;
  public domainmatch: boolean = false;
  public domainmatch1: boolean = false;
  public com_website: any;

  constructor(
    private builder: FormBuilder,
    private dataService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
      const getUserDet = localStorage.getItem("currentUser");
      this.loginUserDet = JSON.parse(getUserDet);
      this.form = builder.group({
        company_name: ['', [
          Validators.required,
          Validators.minLength(3)
        ]],
  
        mobile_number: ['', [
          Validators.required,
          Validators.minLength(10)
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
        website: ['', [
          Validators.required,
          Validators.pattern('https?://.+')
        ]],
        opening_hour: ['', [
          Validators.required,
          Validators.minLength(3)
        ]],
        company_mission: ['', [
          Validators.required,
  
        ]],
        company_vission: ['', [
          Validators.required,
  
        ]],
  
        bio: ['', [
          //Validators.required,
          //Validators.minLength(3)
        ]]
  
      });

      this.adminform = builder.group({
        email: ['', [
          Validators.required,
          Validators.email,
          Validators.minLength(3)
        ]],
        txt_password: ['', [
          Validators.required
        ]],
        name: ['', [
          Validators.required
        ]],
        state: ['', []],
        city: ['', []],
        address: ['', []],
        company_mission: ['', []],
        company_vission: ['', []]
  
      });

      setTimeout(() => {
        //debugger;
        let autocomplete = new google.maps.places.Autocomplete(
                    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
          { types: ['geocode'] });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var place = autocomplete.getPlace();
          this.searchData = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          localStorage.setItem("address", JSON.stringify(this.searchData));
          //localStorage.setItem("lat", place.geometry.location.lat());
          //localStorage.setItem("lng", place.geometry.location.lng());
        });
  
      }, 1000);
   }

    ngOnChanges(changes: SimpleChanges) {
      const name: SimpleChange = changes.companyID;
      this._name = name.currentValue;
      if(this._name){
        this.setStoreId();
      }
    }

  setStoreId(){
      this.isCompanyId=this._name
      this.getCompanyDetails(); 
      this.getSubadminListByAdmin(); 
      //console.log(this.isCompanyId);
      //this.getMediaList();  
  }
  
  get companyID(): number {
    return this._name;
  }
  
  @Input()
  set companyID(name: number) {
    this._name = name;
  }

  @Input() adminStatus: {
    isAdmin: boolean;
    isSuperAdmin: boolean;
   
  };

  ngOnInit() {

  }

  public getCompanyDetails() {
    /*setTimeout(() => {
      //debugger;
      let autocomplete = new google.maps.places.Autocomplete(
                  (document.getElementById('autocomplete')),
        { types: ['geocode'] });
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        this.searchData = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        localStorage.setItem("address", JSON.stringify(this.searchData));
        
      });

    }, 1000);*/
    
    if (this.isCompanyId >0) {
      const dataUserDet = {
        "id": this.isCompanyId
      };
      this.dataService.getUserDetById(dataUserDet).subscribe(data => {
        const details = data;
        
        if (details.Ack == "1") {
          this.publicCmpDet = details.UserDetails[0];
          this.com_website = details.UserDetails[0].website;
          //alert(this.publicCmpDet);
          /*this.dataService.getUserDetById({ "id": this.isCompanyId}).subscribe(data => {
            if (data.Ack == "1") {
              this.publicCmpDet = data.UserDetails[0];
            }
          },
          error => {

          });*/
        }
      },
      error => {

      });
    } else {
    }
  }

  public updateAccount() {
    this.loading = true;
    let localAdd=localStorage.getItem("address");
    const result = {},
    userValue = this.form.value;
    //console.log(userValue)
    userValue.id = this.isCompanyId;

    if (localAdd!=''){
      this.searchData=JSON.parse(localAdd);
      if(this.searchData.address && this.searchData.lat){
          userValue.address = this.searchData.address;
          userValue.lat = this.searchData.lat;
          userValue.lng = this.searchData.lng;
      }
    }
    this.dataService.updateAccountDet(userValue).subscribe(data => {
        this.editAbtActiveTab = '';
        const details = data;
        /*localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);*/
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        localStorage.setItem("address", '');
        //this.searchData = { address: '', lat: '', lng: '' };
      },
      error => {
        alert(error);
      });

  }

  public getSubadminListByAdmin() {
    const dataUserDet = {
      "company_id": this.isCompanyId
    };
    this.dataService.getSubadminListById(dataUserDet).subscribe(data => {
      const details = data;
      if (details.Ack == "1") {
        this.cmpSubadminList = details.subadminlist;
      }
    },
      error => {
      });
  }

  public addSubadminForm() {
    this.loading = true;
    const userValue = this.adminform.value;
    userValue.company_uid = this.isCompanyId;
    //console.log(userValue)
    this.dataService.createCmpSubadmin(userValue).subscribe(data => {
      this.loading = false;
      this.successMsg = 'Admin added successfully';
      this.adminform.reset();
      this.getSubadminListByAdmin();
    }, error => {
      alert(error);
    });
  }

  public editSubadminForm() {
    this.loading = true;
    const userValue = this.adminform.value;
    userValue.id = this.editSubAdminId;
    this.dataService.updateAccountDet(userValue).subscribe(data => {
      this.loading = false;
      this.successMsg = 'Admin edit successfully';
      //this.adminform.reset();
      this.getSubadminListByAdmin();
    }, error => {
      alert(error);
    });
  }

  public editAdmin(edit_id) {
    this.loading = true;
    this.editSubAdminId = edit_id;
    const uploadJsonData = {
      "id": edit_id
    };
    //console.log(uploadJsonData);
    this.dataService.getUserDetById(uploadJsonData).subscribe(data => {
      //console.log(data);
      this.loading = false;
      this.editSubAdmindata = data.UserDetails[0];
      //console.log(this.editSubAdmindata);
      this.aboutActiveTab = 'edit_subadmin';
    },
      error => {
        alert(error);
      });
  }

  public checkCompanyurl(values: Object, email) {
    //alert(email);
    if (values != '') {

      let signupCheckcompanyurl = { "company_name": "", "email": email, "website": values };
      //console.log(signupCheckcompanyname);
      this.dataService.userCheckCompanyurl(signupCheckcompanyurl).subscribe(data => {
        let details = data;
        console.log(data);
        if (details.domain_match == "1") {
          this.domainmatch1 = false;
          //return false;
        }
        else {
          this.domainmatch1 = true;
          //return false;
        }
      },
        error => {
          console.log('details');
        }
      );
    } 
  }

  public checkEmail(values: Object): void {
    // console.log(this.com_website);

    // let web_val = web_get.website;
    //alert(this.com_website);
    if (values != '') {
      let signupCheckEmail = {
        "email": values,
        "website": this.com_website
      };
      console.log(signupCheckEmail)
      this.dataService.userCheckEmail(signupCheckEmail)
        .subscribe(data => {
          let details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.checkEmailExist = false;
            // return false;
          } else {
            //alert('Invalid login');
            this.checkEmailExist = true;
            //return false;
          }
          if (details.domain_match == "1") {
            this.domainmatch = false;
            //return false;
          }
          else {
            this.domainmatch = true;
            //return false;
          }
        },
        error => {

        }
        );
    } else {

    }
  }

  public deleteAdmin(del_id) {
    this.loading = true;
    const uploadJsonData = {
      "id": del_id
    };
    this.dataService.deleteSubAdmin(uploadJsonData).subscribe(
      data => {
        this.loading = false;
        window.location.reload();
      },
      error => {
        alert(error);
    });
  }

  public aboutToggleTab(data: any) {
    this.successMsg = '';
    this.errorMsg = '';
    this.aboutActiveTab = data;
    this.adminform.reset();
  }

  public editAboutToggleTab(data: any) {
    this.editAbtActiveTab = data;
    this.successMsg = '';
    this.errorMsg = '';
    //console.log(data);
  }

}
