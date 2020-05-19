import { Routes } from "@angular/router";

import { RegisterComponent } from "./register/register.component";
import { PricingComponent } from "./pricing/pricing.component";
import { LockComponent } from "./lock/lock.component";
import { LoginComponent } from "./login/login.component";
import {EmailverifyComponent} from './emailverify/emailverify.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {ConfirmemailComponent} from './confirmemail/confirmemail.component';
import {ConfirmcodeComponent} from './confirmcode/confirmcode.component';

export const PagesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "lock",
        component: LockComponent
      },
      {
        path: "emailVerify",
        component: EmailverifyComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "confirmEmail",
        component: ConfirmemailComponent
      },
      {
        path: "confirmCode",
        component: ConfirmcodeComponent
      },
      {
        path: "resetPassword",
        component: ResetpasswordComponent
      },
      {
        path: "pricing",
        component: PricingComponent
      }
    ]
  }
];
