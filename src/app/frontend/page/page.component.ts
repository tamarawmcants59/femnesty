import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FrontendService } from "../../components/frontend-app-header/frontend.service";
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  public commentform: FormGroup;
  pageDetData=[];
  pageSlugName='';
  public getPageSiteSetData:any;
  public successMsg:string= '';
  public errorMsg:string= '';
  public teamListData=[];
  public siteSettingsDet: Object = {};

  constructor(
    private _page_service: FrontendService,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
  ) { 
    this.commentform = builder.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      mobile_no: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      subject: ['', [
        Validators.required
      ]],
      message: ['', [
        Validators.required
      ]]
    });

    this.activatedRoute.params.subscribe((params: Params) => {
        this.pageSlugName = params['slug'];
        if(this.pageSlugName == 'contact-us'){
        }else{
          this.getPageDetails();
        }
        this.getSiteSettingData();
        this.getAllTeamListData();
    });
      
  }

  ngOnInit() {
    //alert('hi');
    this._page_service.getSiteSettings().subscribe(data => {
      if (data.Ack == "1") {
        this.siteSettingsDet = data.SiteSettings[0];
        //console.log(this.siteSettingsDet);
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }
  
  public getPageDetails(){
    this._page_service.getPageDetBySlug(this.pageSlugName).subscribe(data=>{
        let details=data;
        //console.log(details);
        if (details.Ack=="1") {
            this.pageDetData = details.ContentAllBySlug[0];
            //console.log(this.pageDetData);
            return false;
        }else{
            //localStorage.setItem('isLoggedIn', '1');
            return false;
        }
      },
      error => {
        console.log('Something went wrong!');
      }
    ); 
  }

  public getSiteSettingData(){
    this._page_service.getSiteSettings().subscribe(data=>{
        //console.log(data);
        if (data.Ack=="1") {
            this.getPageSiteSetData = data.SiteSettings[0];
        }
      },
      error => {
        console.log('Something went wrong!');
      }
    ); 
  }
  
  public getAllTeamListData(){
    this._page_service.getallTeamList().subscribe(data=>{
        //console.log(data);
        if (data.Ack=="1") {
            this.teamListData = data.AllmentorList;
        }
      },
      error => {
        console.log('Something went wrong!');
      }
    ); 
  }

  public submitContactForm() {
    let userValue = this.commentform.value;
    
    this._page_service.userContactDataSend(userValue)
      .subscribe( data => {
        this.successMsg='You have successfully send the request. We will response as soon as possible.';
        this.commentform.reset();
      },
      error => {
        alert(error);
      });
  }

}
