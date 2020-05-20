import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MustMatch} from '../../forms/validation-forms/password-validator.component';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit, OnDestroy {

    private focus3;
    private focus4;

    constructor(
        private formBuilder: FormBuilder,
        private userService: AuthService,
        private toastr: ToastrService,
        private _router: Router
    ) {}

    resetPassword: FormGroup;
    submitted = false;

    ngOnInit() {
        var $page = document.getElementsByClassName("full-page")[0];
        var image_src;
        var image_container = document.createElement("div");
        image_container.classList.add("full-page-background");
        // image_container.style.backgroundImage = "url(assets/img/bg13.jpg)";
        $page.appendChild(image_container);
        $page.classList.add("lock-page");

        this.resetPassword = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        })
    }

    get f() {return this.resetPassword.controls}

    onSubmit() {
        this.submitted = true;
        if (this.resetPassword.invalid) {
            return;
        }
        var userEmail = localStorage.getItem('userEmail');
        this.resetPassword.value.userEmail = userEmail;
        this.userService.resetPassword(this.resetPassword.value).subscribe(res => {
            if (res['success'] === true) {
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
                this._router.navigate(['app/dashboard'])
            }
            else {
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
            }
        });
    }

    ngOnDestroy() {
        var $page = document.getElementsByClassName("full-page")[0];
        $page.classList.remove("lock-page");
    }

    user_login() {
      this._router.navigate(['pages/login'])
    }
}