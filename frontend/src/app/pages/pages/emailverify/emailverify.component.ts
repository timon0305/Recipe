import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.css']
})
export class EmailverifyComponent implements OnInit, OnDestroy {
    constructor(
        private formBuilder: FormBuilder,
        private userService: AuthService,
        private toastr: ToastrService,
        private _router: Router
    ) {}

    emailVerify: FormGroup;
    submitted = false;

    ngOnInit() {
        var $page = document.getElementsByClassName("full-page")[0];
        var image_src;
        var image_container = document.createElement("div");
        image_container.classList.add("full-page-background");
        // image_container.style.backgroundImage = "url(assets/img/bg13.jpg)";
        $page.appendChild(image_container);
        $page.classList.add("lock-page");

      this.emailVerify = this.formBuilder.group({
          code: ['', Validators.required]
      })
    }

    get f() {return this.emailVerify.controls}

    onSubmit() {
      this.submitted = true;
      if (this.emailVerify.invalid) {
        return;
      }
      const code = this.f.code.value;
      this.userService.emailVerify({'code': code}).subscribe(res => {
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
}
