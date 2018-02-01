import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HubService } from "../../../components/hub-create/hub.service";
import { UserService } from "../user.service";
import { AgmCoreModule } from '@agm/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectModule } from "../../../../../node_modules/ng2-select";
// import { ShareButtons } from "@ngx-share/core";
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var google: any;
@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css']
})
export class HubsComponent implements OnInit {
  public isloginUser = 1;
  public postform: FormGroup;
  public loginUserId: any;
  public hubSlug = '';
  public hubDetails = { id: '' };
  public groupPostDetData: object = {};
  public groupPostList = {};
  public uninvitedUsers = [];
  public loading = false;
  public address: any;
  public lat:0;
  public lng:0;
  public IsShowAddress = true;
  public title: any;
  public activeTab = 'posts';
  IsGroupAdmin = false;
  public successMsg = '';
  public items = [];
  public email: any;
  public phone: any;
  public website: any;
  public organizer: any;
  public friends = [];
  public repoUrl = '';
  public latestArticles = [];
  public startDateString;
  public endDateString;
  public description: any;
  @ViewChild("fileTypeEdit") fileTypeEdit: ElementRef;
  @ViewChild("addressEdit") addressEdit: ElementRef;
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hubService: HubService,
    private builder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.postform = builder.group({
      user_ids: ['', [
        Validators.required
      ]]
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.hubSlug = params['slug'];
      if (this.hubSlug == '') {
        this.router.navigateByUrl('/');
      }
    });

    this.loginUserId = localStorage.getItem("loginUserId");
    this.repoUrl = environment.website_url + this.router.url;
  }

  ngOnInit() {
    let autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
      { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      localStorage.setItem("address", JSON.stringify(address_data));

    });
    this.getHubDetails();
    this.getLastFourArticle();
  }
  public acceptHubRequest() {

    this.hubService.acceptHubRequest({ hub_id: this.hubDetails.id, user_id: this.loginUserId }).subscribe(data => {
      console.log(data);
      this.getHubDetails();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  public rejectHubRequest() {

    this.hubService.rejectHubRequest({ hub_id: this.hubDetails.id, user_id: this.loginUserId }).subscribe(data => {
      console.log(data);
      this.getHubDetails();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  attendHubDetails(hubDetails) {
    const attendData = { hub_id: this.hubDetails.id, user_id: this.loginUserId };
    this.hubService.attendHub(attendData).subscribe(data => {
      this.getHubDetails();
    },
      error => {
        console.log('Something went wrong!');
      });
  }
  public getHubDetails() {
    this.hubService.getHubDetails(this.hubSlug, this.loginUserId).subscribe(data => {
      if (data.Ack == 1) {
        localStorage.setItem("groupAdmin", data.details.user_id);
        if (this.loginUserId == data.details.user_id) {
          this.IsGroupAdmin = true;
        }
        else {
          this.IsGroupAdmin = false;
        }
        if (data.details.type == "R" && data.details.recurring_start) {
          let day = new Date(data.details.recurring_start).getDay();
          let result = '';
          switch (day) {
            case 0: {
              result = 'Sunday';
              break;
            }
            case 1: {
              result = 'Monday';
              break;
            }
            case 2: {
              result = 'Tuesday';
              break;
            }
            case 3: {
              result = 'Wednesday';
              break;
            }
            case 4: {
              result = 'Thursday';
              break;
            }
            case 5: {
              result = 'Friday';
              break;
            }
            case 6: {
              result = 'Saturday';
              break;
            }
            default: {
              result = 'Sunday';
              break;
            }
          }
          data.details.day = result;
        }
        this.hubDetails = data.details;
        this.startDateString = new Date(data.details.start_date).toISOString().replace(/[-:.]/g, "").replace('000Z', "Z");
        this.endDateString = new Date(data.details.end_date).toISOString().replace(/[-:.]/g, "").replace('000Z', "Z");

        this.groupPostDetData = { activitytype: '4', activityid: this.hubDetails.id };

        this.getUserPostDetails();
        this.getUnivitedUsers();
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }


  public getUserPostDetails() {
    if (this.hubDetails.id != '') {
      const dataUserDet = {
        "page_no": 1,
        "group_id": this.hubDetails.id,
        "type": '4'
      };
      this.dataService.getGroupPostById(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupPostList = data.AllPost;
          }
        },
        error => {

        });
    }
  }

  public attendHub(hubDetails) {

    this.hubService.rejectHubRequest({ hub_id: this.hubDetails.id, user_id: this.loginUserId }).subscribe(data => {
      console.log(data);
      this.getHubDetails();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  public deleteInvites(user_id) {
    const attendData = { hub_id: this.hubDetails.id, user_id: user_id };
    this.hubService.attendHub(attendData).subscribe(data => {
      this.getHubDetails();
    },
      error => {
        console.log('Something went wrong!');
      });
  }
  public getLastFourArticle() {
    this.dataService.getFourArticleList().subscribe(data => {
      let details = data;
      if (details.Ack == "1") {
        this.latestArticles = details.LastArticleList;
      }
    },
      error => {
      }
    );
  }
  fileChangePost($event, hubDetails) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    this.loading = true;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      const data = { image: image.src, id: that.hubDetails.id, user_id: hubDetails.user_id }
      that.hubService.editHubDetails(data).subscribe(data => {
        that.loading = false;
        that.getHubDetails();
      },
        error => {
          that.loading = false;
          alert('Sorry there is some error.')
        });
    };
    myReader.readAsDataURL(file);
  }
  public getUnivitedUsers() {
    const attendData = { hub_id: this.hubDetails.id, user_id: this.loginUserId };
    this.hubService.uninvitedUsers(attendData).subscribe(data => {
      if (data.Ack == 1) {
        console.log('uninvited', data.details);
        this.uninvitedUsers = data.details;
        this.uninvitedUsers.forEach((color: { first_name: string, id: string }) => {
          console.log(color);
          this.items.push({
            id: color.id,
            text: color.first_name
          });
        });
        console.log('items', this.items);
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }
  openFile() {
    this.fileTypeEdit.nativeElement.click();
  }
  openEdit(type, hubDetails) {
    if (type == 'title') {
      this.IsShowAddress = true;
      if (this.title) {
        this.description = '';
        this.organizer = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.loading = true;
        const data = { title: this.title, id: this.hubDetails.id, user_id: hubDetails.user_id }
        this.hubService.editHubDetails(data).subscribe(data => {
          this.loading = false;
          this.title = "";
          this.hubSlug=data.HubDetails.slug;
          this.getHubDetails();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.description = '';
        this.organizer = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.title = hubDetails.title;
      }

    }
    else if (type == 'description') {
      this.IsShowAddress = true;
      if (this.description) {
        this.title = '';
        this.organizer = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.loading = true;
        const data = { description: this.description, id: this.hubDetails.id, user_id: hubDetails.user_id }
        this.hubService.editHubDetails(data).subscribe(data => {
          this.description = '';
          this.loading = false;
          this.getHubDetails();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.title = '';
        this.organizer = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.description = hubDetails.description;
      }
    }
    else if (type == 'organizer') {
      this.IsShowAddress = true;
      if (this.organizer) {
        this.title = '';
        this.description = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.loading = true;
        const data = { organizer: this.organizer, id: this.hubDetails.id, user_id: hubDetails.user_id }
        this.hubService.editHubDetails(data).subscribe(data => {
          this.organizer = '';
          this.loading = false;
          this.getHubDetails();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.title = '';
        this.description = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.organizer = hubDetails.organizer;
      }
    }
    else if (type == 'email') {
      this.IsShowAddress = true;
      if (this.email) {
        this.title = '';
        this.description = '';
        this.organizer = '';
        this.phone = '';
        this.website = '';
        this.loading = true;
        const data = { email: this.email, id: this.hubDetails.id, user_id: hubDetails.user_id }
        this.hubService.editHubDetails(data).subscribe(data => {
          this.email = '';
          this.loading = false;
          this.getHubDetails();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.title = '';
        this.description = '';
        this.email = hubDetails.email;
        this.phone = '';
        this.website = '';
        this.organizer = '';
      }
    }
    else if (type == 'phone') {
      this.IsShowAddress = true;
      if (this.phone) {
        this.title = '';
        this.description = '';
        this.organizer = '';
        this.email = '';
        this.website = '';
        this.loading = true;
        const data = { phone: this.phone, id: this.hubDetails.id, user_id: hubDetails.user_id }
        this.hubService.editHubDetails(data).subscribe(data => {
          this.phone = '';
          this.loading = false;
          this.getHubDetails();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.title = '';
        this.description = '';
        this.email = ''
        this.phone = hubDetails.phone;
        this.website = '';
        this.organizer = '';
      }
    }
    else if (type == 'website') {
      this.IsShowAddress = true;
      if (this.website) {
        this.title = '';
        this.description = '';
        this.organizer = '';
        this.email = '';
        this.phone = '';
        if (this.website == "Enter your website") {
          this.website = '';
        }
        else {
          this.loading = true;
          const data = { website: this.website, id: this.hubDetails.id, user_id: hubDetails.user_id }
          this.hubService.editHubDetails(data).subscribe(data => {
            this.website = '';
            this.loading = false;
            this.getHubDetails();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }

      }
      else {
        this.title = '';
        this.description = '';
        this.email = ''
        this.phone = '';
        if (hubDetails.website)
          this.website = hubDetails.website;
        else
          this.website = "Enter your website"
        this.organizer = '';
      }
    }
    else if (type == 'address') {
      this.IsShowAddress = false;
      if (this.address) {
        this.title = '';
        this.description = '';
        this.organizer = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.loading = true;
        if (localStorage.getItem("address")) {
          let addressData = JSON.parse(localStorage.getItem("address"));
          const data = { address: addressData.address, lat: addressData.lat, lng: addressData.lng, id: this.hubDetails.id, user_id: hubDetails.user_id }
          this.hubService.editHubDetails(data).subscribe(data => {
            this.address = '';
            this.lat=0;this.lng=0;
            this.IsShowAddress = true;
            this.loading = false;
            this.getHubDetails();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }

      }
      else {
        this.title = '';
        this.description = '';
        this.email = ''
        this.phone = '';
        this.website = '';
        this.organizer = '';
        this.address=hubDetails.address;
        this.lat=hubDetails.lat;this.lng=hubDetails.lng;
        this.addressEdit.nativeElement.style.display = "block";
      }
    }
  }
  public sendInvites() {
    const userValue = this.postform.value;
    userValue.hub_id = this.hubDetails.id;
    console.log(userValue);
    this.hubService.sendInvites(userValue).subscribe(data => {
      if (data.Ack == 1) {
        this.successMsg = 'Request Sent Successfully';
        this.postform.reset();
        this.getUnivitedUsers();
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public openBetaInfo(content) {
    this.modalService.open(content);
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
