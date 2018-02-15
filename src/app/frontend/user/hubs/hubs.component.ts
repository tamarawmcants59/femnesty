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
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css']
})
export class HubsComponent implements OnInit {
  public isloginUser = 1;
  public postform: FormGroup;
  searchName: any;
  public showProfileCrop = false;
  public loginUserId: any;
  searchErrorMessage: any;
  modalErrorMsg: any;
  erroMsg: any;
  category_id: any;
  isShowPicker = false;
  public catList = [];
  IsShowText=false;
  public hubList = [];
  recurring_end: any;
  public IsShowCropperCoverImage = false;
  public isBlockUser: boolean = false;
  croppedImage: any = '';
  public hubSlug = '';
  start_time: any;
  end_time: any;
  private connectionsPageSize = 5;
  public totalUninvitedUsers = [];
  public hubDetails = { id: '' };
  public groupPostDetData: object = {};
  public groupPostList = {};
  public uninvitedUsers = [];
  $uploadCrop: any;
  filetredFriendList = [];
  public IsShowTopViewMore = false;
  public loading = false;
  public address: any;
  public lat: 0;
  public lng: 0;
  public IsShowAddress = true;
  public title: any;
  public activeTab = 'posts';
  IsGroupAdmin = false;
  public successMsg = '';
  public items = [];
  public minDate = new Date();
  public email: any;
  public phone: any;
  editDate: any;
  public website: any;
  public organizer: any;
  public friends = [];
  public repoUrl = '';
  public latestArticles = [];
  public startDateString;
  public endDateString;
  public description: any;
  public IsShowOption= false;
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
    // let autocomplete = new google.maps.places.Autocomplete(
    //   /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
    //   { types: ['geocode'] });
    // google.maps.event.addListener(autocomplete, 'place_changed', function () {
    //   var place = autocomplete.getPlace();
    //   let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
    //   localStorage.setItem("address", JSON.stringify(address_data));

    // });
    this.getHubDetails();
    this.getHubCategories();
    this.getLastFourArticle();
    this.getHubList();
  }

  public getHubList() {
    this.hubService.getmyRequestGroupList(this.loginUserId).subscribe(data => {
      //console.log(data)
      if (data.Ack == "1") {
        this.hubList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }
  public getHubCategories() {
    this.dataService.getHubCategories().subscribe(data => {
      if (data.Ack == "1") {
        this.catList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
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
  openUpdateCoverProModal(updateCoverPictureModal) {

    this.modalErrorMsg = '';
    setTimeout(() => {
      this.$uploadCrop = $('#upload-demo').croppie({
        viewport: {
          width: 615,
          height: 195,
          type: 'rectangle'
        },
        enableExif: true
      });
    }, 100);
    this.showProfileCrop = false;
    this.croppedImage = '';
    this.modalService.open(updateCoverPictureModal);
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
        this.checkBlockUser();
        this.getUserPostDetails();
        this.getUnivitedUsers();
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public checkBlockUser(){
    if(this.hubDetails.id!=''){
        let dataUserDet ={
          "group_id": this.hubDetails.id,
          "login_id": this.loginUserId,
          "group_type":4
        };
        this.dataService.checkTheBlockUser(dataUserDet).subscribe(data => {
            let details=data;
            if (data.blocked) {
              this.isBlockUser = true;
            }
        },
        error => {
          
        }); 
    }
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
  public UploadCoverImg(hubDetails) {
    this.loading = true;
    const that = this;
    this.$uploadCrop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function (resp) {
      if (resp == 'data:,') {
        that.loading = false;
        that.modalErrorMsg = 'please upload an image to save.';
      }
      else {
        const uploadJsonData = {
          image: resp, id: that.hubDetails.id, user_id: hubDetails.user_id
        };
        that.hubService.editHubDetails(uploadJsonData)
          .subscribe(
          data => {
            that.loading = false;
            that.getHubDetails();
            window.location.reload();
          },
          error => {
            alert(error);
          });
      }

    });
    //console.log(this.cropper.image.image);
    // this.loading = true;
    // const data = { image: this.coverCroppedImage, id: this.groupDetailsData.id }
    // this.dataService.editGroupDataSend(data).subscribe(data => {
    //   this.loading = false;
    //   this.getGroupDetailsByName();
    //   window.location.reload();
    // },
    //   error => {
    //     this.loading = false;
    //     alert('Sorry there is some error.')
    //   });

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
        // this.uninvitedUsers = data.details;
        // this.uninvitedUsers.forEach((color: { first_name: string, id: string }) => {
        //   console.log(color);
        //   this.items.push({
        //     id: color.id,
        //     text: color.first_name
        //   });
        // });
        this.uninvitedUsers = [];
        if (data.details.length > 5) {
          //  this.IsShowTopViewMore = true;
          for (let i = 0; i < data.details.length; i++) {
            if (this.uninvitedUsers.length < 5) {
              this.uninvitedUsers.push(data.details[i]);
            }
          }

        }
        else {
          // this.IsShowTopViewMore = false;
          this.uninvitedUsers = data.details;
        }

        this.totalUninvitedUsers = data.details;
        this.totalUninvitedUsers.forEach((color: { first_name: string, id: string }) => {
          this.items.push({
            id: color.id,
            text: color.first_name
          });
        });
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }
  viewMore() {
    this.connectionsPageSize = this.connectionsPageSize + 5;
    this.uninvitedUsers = [];
    this.filetredFriendList = [];
    if (this.totalUninvitedUsers.length > this.connectionsPageSize) {
      this.IsShowTopViewMore = true;
    }
    else {
      this.IsShowText=true;
      this.IsShowTopViewMore = false;
    }
    for (let i = 0; i < this.connectionsPageSize; i++) {
      if (this.totalUninvitedUsers[i]) {
        this.uninvitedUsers.push(this.totalUninvitedUsers[i]);
        this.filetredFriendList.push(this.totalUninvitedUsers[i]);
      }

    }
  }
  searchConnections(value) {
    if (value) {
      this.IsShowTopViewMore = false;
      value = value.toLowerCase();
      let searchResult = this.totalUninvitedUsers.filter(item => {
        if (item.name) {
          if (item.name.toLowerCase().search(value) !== -1) {
            return item;
          }
        }

      });
      if (searchResult && searchResult.length) {
        if (searchResult.length > 6) {
          this.IsShowTopViewMore = true;
        }
        else {
          this.IsShowTopViewMore = false;
        }
        this.filetredFriendList = [];
        for (var i = 0; i < searchResult.length; i++) {
          if (this.filetredFriendList.length < 6) {
            this.filetredFriendList.push(searchResult[i]);
          }

        }
      }
      else {
        this.IsShowTopViewMore = false;
        this.filetredFriendList = [];
        this.IsShowText=false;
        this.searchErrorMessage = "No record found.";
      }
    }
    else {
      this.IsShowTopViewMore = false;
      this.filetredFriendList = [];
      this.searchErrorMessage = '';
    }

  }
  private validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  openFile() {
    this.fileTypeEdit.nativeElement.click();
  }
  openEdit(type, hubDetails) {
    this.erroMsg = '';
    if (type == 'title') {
      this.IsShowAddress = true;
      if (this.title) {
        this.description = '';
        this.organizer = '';
        this.category_id = '';
        this.email = '';
        this.address = '';
        this.phone = '';
        this.website = '';
        this.loading = true;
        const data = { title: this.title, id: this.hubDetails.id, user_id: hubDetails.user_id }
        this.hubService.editHubDetails(data).subscribe(data => {
          this.loading = false;
          this.title = "";
          this.hubSlug = data.HubDetails.slug;
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
        this.category_id = '';
        this.address = '';
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
        this.category_id = '';
        this.address = '';
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
        this.address = '';
        this.category_id = '';
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
        this.address = '';
        this.category_id = '';
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
        this.address = '';
        this.description = '';
        this.email = '';
        this.category_id = '';
        this.phone = '';
        this.website = '';
        this.organizer = hubDetails.organizer;
      }
    }
    else if (type == 'email') {
      this.IsShowAddress = true;
      if (this.email) {
        if (this.validateEmail(this.email)) {
          this.title = '';
          this.description = '';
          this.organizer = '';
          this.phone = '';
          this.address = '';
          this.category_id = '';
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
          this.erroMsg = "Please give a valid email.";
          window.scrollTo(0, 0);
        }

      }
      else {
        this.title = '';
        this.description = '';
        this.email = hubDetails.email;
        this.phone = '';
        this.website = '';
        this.organizer = '';
        this.address = '';
        this.category_id = '';
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
        this.address = '';
        this.category_id = '';
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
        this.email = '';
        this.address = '';
        this.phone = hubDetails.phone;
        this.website = '';
        this.organizer = '';
        this.category_id = '';
      }
    }
    else if (type == 'website') {
      this.IsShowAddress = true;
      if (this.website) {
        this.title = '';
        this.description = '';
        this.organizer = '';
        this.address = '';
        this.email = '';
        this.category_id = '';
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
        this.category_id = '';
        this.phone = '';
        this.address = '';
        if (hubDetails.website)
          this.website = hubDetails.website;
        else
          this.website = "Enter your website"
        this.organizer = '';
      }
    }
    else if (type == 'category_id') {
      if (this.category_id) {
        this.title = '';
        this.description = '';
        this.organizer = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.website = '';
        this.loading = true;
        const data = { category_id: this.category_id, id: this.hubDetails.id, user_id: hubDetails.user_id }
        this.hubService.editHubDetails(data).subscribe(data => {
          this.category_id = '';
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
        this.address = '';
        this.website = '';
        this.organizer = '';
        this.category_id = hubDetails.category_id;
      }
    }
    else if (type == 'time') {
      if (this.isShowPicker) {
        let IsValid = false;
        if (this.hubList.length > 0) {
          for (var i = 0; i < this.hubList.length; i++) {
            if (this.hubList[i].type == 'O') {
              const date = new Date(this.hubList[i].date);
              if (date)
                date.setHours(0, 0, 0, 0);
              let date1 = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
              let compareDate = this.editDate;
              if (compareDate)
                compareDate.setHours(0, 0, 0, 0);
              let compareDate1 = compareDate.getDate() + "/" + (compareDate.getMonth() + 1) + "/" + compareDate.getFullYear();
              if (hubDetails.type == "O") {
                if (date1 == compareDate1) {
                  if (hubDetails.id != this.hubList[i].id) {
                    this.erroMsg = "A hub already exists on the entered date.";
                    IsValid = false;
                    window.scrollTo(0, 0);
                    break;
                  }

                }
                else {
                  IsValid = true;
                }
              }
              else if (hubDetails.type == "R") {
                let from = new Date(this.editDate);
                if (from)
                  from.setHours(0, 0, 0, 0);
                let to = new Date(this.recurring_end);
                if (to)
                  to.setHours(0, 0, 0, 0);
                let check = new Date(this.hubList[i].date);
                if (check)
                  check.setHours(0, 0, 0, 0);
                if (check >= from && check <= to) {
                  if (hubDetails.id != this.hubList[i].id) {
                    this.erroMsg = "A hub already exists on the entered date.";
                    IsValid = false;
                    window.scrollTo(0, 0);
                    break;
                  }

                }
                else {
                  IsValid = true;
                }
              }

            }
            else if (this.hubList[i].type == 'R') {
              let from = new Date(this.hubList[i].recurring_start);
              if (from)
                from.setHours(0, 0, 0, 0);
              let to = new Date(this.hubList[i].recurring_end);
              if (to)
                to.setHours(0, 0, 0, 0);
              let check = this.editDate;
              if (check)
                check.setHours(0, 0, 0, 0);
              if (check >= from && check <= to) {
                if (hubDetails.id != this.hubList[i].id) {
                  this.erroMsg = "A hub already exists on the entered date.";
                  IsValid = false;
                  window.scrollTo(0, 0);
                  break;
                }

              }
              else {
                IsValid = true;
              }
            }
          }
        }
        else {
          IsValid = true;
        }
        if (IsValid) {
          this.title = '';
          this.description = '';
          this.organizer = '';
          this.email = '';
          this.phone = '';
          this.address = '';
          this.website = '';
          this.category_id = '';
          this.isShowPicker = false;
          this.loading = true;
          let data;
          if (hubDetails.type == "O") {
            data = { hub_date: this.editDate, id: this.hubDetails.id, user_id: hubDetails.user_id, start_time: this.start_time, end_time: this.end_time };
          }
          else {
            data = { recurring_start: this.editDate, recurring_end: this.recurring_end, id: this.hubDetails.id, user_id: hubDetails.user_id, start_time: this.start_time, end_time: this.end_time };
          }

          this.hubService.editHubDetails(data).subscribe(data => {
            this.editDate = ''; this.start_time = ''; this.end_time = ''; this.editDate = ''; this.recurring_end;
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
        this.email = '';
        this.phone = '';
        this.address = '';
        this.website = '';
        this.organizer = '';
        this.category_id = '';
        this.isShowPicker = true;
        if (hubDetails.type == 'O') {
          if (hubDetails[16])
            this.editDate = new Date(hubDetails[16]);
          else
            this.editDate = new Date(hubDetails.hub_date_new);
          this.start_time = hubDetails.start_time; this.end_time = hubDetails.end_time;
        }
        else if (hubDetails.type == 'R') {
          this.editDate = new Date(hubDetails.recurring_start);
          this.recurring_end = new Date(hubDetails.recurring_end);
          this.start_time = hubDetails.start_time; this.end_time = hubDetails.end_time;
        }

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
            this.IsShowAddress = true;
            this.lat = 0; this.lng = 0;
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
        setTimeout(function () {
          let autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
            { types: ['geocode'] });
          google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
            localStorage.setItem("address", JSON.stringify(address_data));

          });
        }, 100)
        this.title = '';
        this.description = '';
        this.email = ''
        this.phone = '';
        this.website = '';
        this.organizer = '';
        this.address = hubDetails.address;
        this.lat = hubDetails.lat; this.lng = hubDetails.lng;

        // this.addressEdit.nativeElement.style.display = "block";
      }
    }
  }
  resetCover() {
    $(".upload-demo-wrap").hide();
    this.IsShowCropperCoverImage = false;
  }
  coverCropperChange(event) {
    $(".upload-demo-wrap").show();
    this.IsShowCropperCoverImage = true;
    const image: any = new Image();
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      $('.upload-demo').addClass('ready');
      image.src = loadEvent.target.result;
      that.$uploadCrop.croppie('bind', {
        url: image.src
      }).then(function () {
        console.log('jQuery bind complete');
      });
    };
    myReader.readAsDataURL(file);
  }
  resetFilter() {
    this.IsShowTopViewMore = false;
    this.filetredFriendList = [];
  }
  public sendInvites(id) {
    const userValue = this.postform.value;
    userValue.hub_id = this.hubDetails.id;
    userValue.user_ids = [];
    userValue.user_ids.push(id);
    this.hubService.sendInvites(userValue).subscribe(data => {
      if (data.Ack == 1) {
        this.successMsg = 'Request Sent Successfully';
        //this.postform.reset();
        //this.filetredFriendList = [];
        if (this.filetredFriendList.length == 1) {
          this.filetredFriendList = [];
        }
        else {
          var index;
          for (var i = 0; i < this.filetredFriendList.length; i++) {
            if (this.filetredFriendList[i].id == id) {
              index = id;
              break;
            }
          }
          if (index) {
            this.filetredFriendList.splice(index, 0);
          }
        }

        this.searchName = '';
        this.IsShowText=false;
        this.getUnivitedUsers();
      }
    },
      error => {
        console.log('Something went wrong!');
      });

  }

  public copy_link(){
    this.IsShowOption= !this.IsShowOption;
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
