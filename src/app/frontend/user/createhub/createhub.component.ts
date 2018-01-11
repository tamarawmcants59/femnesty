import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { UserService } from "../user.service"; 


@Component({
  selector: 'app-createhub',
  templateUrl: './createhub.component.html',
  styleUrls: ['./createhub.component.css']
})
export class CreatehubComponent implements OnInit {
  public loginUserDet: Object = {};
  public form: FormGroup;
  constructor(private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
      const getUserDet = localStorage.getItem("currentUser");
      this.loginUserDet = JSON.parse(getUserDet);

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
        occupation: ['', [
          Validators.required,
          //Validators.minLength(3)
        ]],
        bio: ['', [
          //Validators.required,
          //Validators.minLength(3)
        ]]

      });
    }

  ngOnInit() {
  }

}
