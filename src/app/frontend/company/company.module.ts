import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRouting } from "./company.rouiting";
import { SignupComponent } from './signup/signup.component';
import { CompanyService } from "./company.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    CompanyRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SignupComponent],
  providers: [CompanyService]
})
export class CompanyModule { }
