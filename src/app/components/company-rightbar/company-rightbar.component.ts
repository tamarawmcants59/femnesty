import { Component, OnInit, Input, SimpleChanges,SimpleChange } from '@angular/core';
import { CompanyService } from "../../frontend/company/company.service";

@Component({
  selector: 'app-company-rightbar',
  templateUrl: './company-rightbar.component.html',
  styleUrls: ['./company-rightbar.component.css']
})
export class CompanyRightbarComponent implements OnInit {
  public userFollowerList = [];
  public companyImageList = [];
  private _name:number;
  public isCompanyId: number;
  public profileId: number;
  

  @Input() profileData: {
    id: number;
    company_name: string;
    bio: string;
    address: string;
    city: string;
    website: string;
    mobile_number: string;
    opening_hour: string;
   
  };
 

  constructor(
    private dataService: CompanyService
    
   
  ) { 
    
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
      this.getFollowerList();  
      this.getMediaList();  
  }
  
  get companyID(): number {
    return this._name;
  }
  
  @Input()
  set companyID(name: number) {
    this._name = name;
  }

  ngOnInit() {
    console.log(this.profileData.id);
    //this.getFollowerList(); 
  }

  public getFollowerList() {    
    if (this.isCompanyId) {
      const dataUserDet = {
        "company_id": this.isCompanyId
      };
      this.dataService.getCompanyFollowerList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userFollowerList = details.CompanyFollowers;
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }
  }

  public getMediaList() {    
    if (this.isCompanyId) {
      const dataUserDet = {
        "group_id": this.isCompanyId,
        "image_type": 3,
        "count":"true"
      };
      this.dataService.getCompanyImageList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.companyImageList = details.AllImageByGroupId;
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }
 
}
