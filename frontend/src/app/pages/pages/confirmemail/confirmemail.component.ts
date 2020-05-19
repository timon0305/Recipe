import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.css']
})
export class ConfirmemailComponent implements OnInit, OnDestroy {
    constructor(
        private formBuilder: FormBuilder,
        private userService: AuthService,
        private toastr: ToastrService,
        private _router: Router
    ) {}

    emailConfirm: FormGroup;
    submitted = false;

    ngOnInit() {
        var $page = document.getElementsByClassName("full-page")[0];
        var image_src;
        var image_container = document.createElement("div");
        image_container.classList.add("full-page-background");
        // image_container.style.backgroundImage = "url(assets/img/bg13.jpg)";
        $page.appendChild(image_container);
        $page.classList.add("lock-page");

        this.emailConfirm = this.formBuilder.group({
            userEmail: ['', [Validators.required, Validators.email]],
        })
    }

    get f() {return this.emailConfirm.controls}

    onSubmit() {
        this.submitted = true;
        if (this.emailConfirm.invalid) {
            return;
        }
        const userEmail = this.f.userEmail.value;
        this.userService.emailConfirm({'userEmail': userEmail}).subscribe(res => {
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
                this._router.navigate(['pages/confirmCode']);
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