import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { LockComponent } from "./lock/lock.component";
import { RegisterComponent } from "./register/register.component";
import { PricingComponent } from "./pricing/pricing.component";
import { PagesRoutes } from "./pages.routing";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { ConfirmcodeComponent } from './confirmcode/confirmcode.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(PagesRoutes)
  ],
  declarations: [
    LoginComponent,
    LockComponent,
    RegisterComponent,
    PricingComponent,
    EmailverifyComponent,
    ResetpasswordComponent,
    ConfirmemailComponent,
    ConfirmcodeComponent
  ]
})
export class PagesModule {}
