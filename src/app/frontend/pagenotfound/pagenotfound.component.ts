import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  public searchResultStr: string = '';
  public form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
  ) { 
    this.form = builder.group({
      skeyword: ['', [

      ]]
    });
  }

  ngOnInit() {
    
  }

  public searchResult(values) {
    //console.log(values);
    this.searchResultStr = values;
  }

  public searchDataResult() {
      this.router.navigateByUrl('/home/search/' + this.searchResultStr);
    
  }
}
