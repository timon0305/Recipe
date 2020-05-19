import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmcode',
  templateUrl: './confirmcode.component.html',
  styleUrls: ['./confirmcode.component.css']
})
export class ConfirmcodeComponent implements OnInit, OnDestroy {
    constructor(
        private formBuilder: FormBuilder,
        private userService: AuthService,
        private toastr: ToastrService,
        private _router: Router
    ) {}

    confirmCode: FormGroup;
    submitted = false;
    public currentEmail: string;

    ngOnInit() {
        var $page = document.getElementsByClassName("full-page")[0];
        var image_src;
        var image_container = document.createElement("div");
        image_container.classList.add("full-page-background");
        // image_container.style.backgroundImage = "url(assets/img/bg13.jpg)";
        $page.appendChild(image_container);
        $page.classList.add("lock-page");

        this.confirmCode = this.formBuilder.group({
            code: ['', Validators.required]
        })
    }

    get f() {return this.confirmCode.controls}

    onSubmit() {
        this.submitted = true;
        if (this.confirmCode.invalid) {
            return;
        }
        const code = this.f.code.value;
        this.userService.confirmCode({'code': code}).subscribe(res => {
            if (res['success'] === true) {
                localStorage.setItem('userEmail', res['data']);
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
                this._router.navigate(['pages/resetPassword'])
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
}