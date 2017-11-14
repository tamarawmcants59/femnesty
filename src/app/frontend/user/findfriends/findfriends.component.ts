import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";

@Component({
  selector: 'app-findfriends',
  templateUrl: './findfriends.component.html',
  styleUrls: ['./findfriends.component.css']
})
export class FindfriendsComponent implements OnInit {
  public postform:FormGroup;
  returnUrl: string;
  errorMsg: string='';
  successMsg: string='';
  public loading = false;

  constructor(
    private builder:FormBuilder, 
    private dataService: UserService, 
    private route: ActivatedRoute,
    private router: Router
   
  ) { 
    //alert();
    this.postform = builder.group({
			search_name: ['', [
			   //Validators.required,
			   //Validators.minLength(3)
			 ]]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
