import { Component, OnInit, OnDestroy } from "@angular/core";
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  private focus;
  private focus2;
  constructor(
      private _router: Router,
      private userService: AuthService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
  ) {}

  login: FormGroup;
  loading = false;
  submitted = false;


  ngOnInit() {
    var $page = document.getElementsByClassName("full-page")[0];
    var image_src;
    var image_container = document.createElement("div");
    image_container.classList.add("full-page-background");
    // image_container.style.backgroundImage = "url(assets/img/bg14.jpg)";
    $page.appendChild(image_container);
    $page.classList.add("login-page");

      this.login = this.formBuilder.group({
          userEmail: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }
  get f() {return this.login.controls}
  onSubmit() {
      this.submitted = true;
      if (this.login.invalid) {
          return;
      }
      this.loading = true;
      this.userService.login(this.login.value)
          .pipe(first())
          .subscribe(res => {
            console.log(res)
            if (res['success'] === true)
            {
                this.toastr.info(
                    '<span class="now-ui-icons ui-1_bell-53"></span> ' + res['msg'],
                    "",
                    {
                        timeOut: 8000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-success alert-with-icon",
                        positionClass: "toast-top-right"
                    }
                );
            }
            else {
              if (res['data'] === null) {
                  this.toastr.info(
                      '<span class="now-ui-icons ui-1_bell-53"></span> ' + res['msg'],
                      "",
                      {
                          timeOut: 8000,
                          closeButton: true,
                          enableHtml: true,
                          toastClass: "alert alert-warning alert-with-icon",
                          positionClass: "toast-top-right"
                      }
                  );
              } else {
                  if (res['data'].active === '1') {
                      this.toastr.info(
                          '<span class="now-ui-icons ui-1_bell-53"></span> ' + res['msg'],
                          "",
                          {
                              timeOut: 8000,
                              closeButton: true,
                              enableHtml: true,
                              toastClass: "alert alert-danger alert-with-icon",
                              positionClass: "toast-top-right"
                          }
                      );
                  } else {
                      this.toastr.info(
                          '<span class="now-ui-icons ui-1_bell-53"></span> ' + res['msg'],
                          "",
                          {
                              timeOut: 8000,
                              closeButton: true,
                              enableHtml: true,
                              toastClass: "alert alert-info alert-with-icon",
                              positionClass: "toast-top-right"
                          }
                      );
                      this._router.navigate(['pages/emailVerify'])
                  }
              }
          }
      })
  }

  ngOnDestroy() {
    var $page = document.getElementsByClassName("full-page")[0];
    $page.classList.remove("login-page");
  }

  user_register() {
    this._router.navigate(['pages/register'])
  }

  resetPassword() {
    this._router.navigate(['pages/confirmEmail'])
  }
}
