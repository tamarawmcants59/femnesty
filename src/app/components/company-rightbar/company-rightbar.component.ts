import { Component, OnInit, Input, SimpleChanges,SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from "../../frontend/company/company.service";
import { AgmCoreModule } from '@agm/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { PostListnerService } from './../../service/post.listner.service';

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
  public repoUrl = '';
  public IsShowOption= false;

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
    private dataService: CompanyService,
    private router: Router,
    private modalService: NgbModal,
    private _postListnerService: PostListnerService
  ) { 
    this._postListnerService.listen().subscribe((msg: any) => {
      console.log(msg);
      this.getMediaList();
    });
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
    //console.log(this.profileData.id);
    //this.getFollowerList(); 
  }

  public getFollowerList() {    
    this.repoUrl = environment.website_url + this.router.url;
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
      //console.log(dataUserDet);
      this.dataService.getCompanyImageList(dataUserDet).subscribe(data => {
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
  public open(content) {
    this.modalService.open(content);
  } 

  public copy_link(){
    this.IsShowOption= !this.IsShowOption;
  }
}


export declare class FacebookParams {
  u: string;  
}

export class GooglePlusParams {
  url: string
}

export class LinkedinParams {
  url: string
}

export declare class PinterestParams {
  url: string;
  media: string;
  description: string;
}

export class TwitterParams {
  text: string;
  url: string;
  hashtags: string;
  via: string;
}