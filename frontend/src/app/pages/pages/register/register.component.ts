import { Component, OnInit, OnDestroy } from "@angular/core";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../forms/validation-forms/password-validator.component';
import {AuthService} from '../../../core/auth/service/auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  private focus;
  private focus2;
  private focus3;
  private focus4;

  constructor(
      private formBuilder: FormBuilder,
      private _router: Router,
      private userService: AuthService
  ) {}

  register: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
    var $page = document.getElementsByClassName("full-page")[0];
    var image_src;
    var image_container = document.createElement("div");
    image_container.classList.add("full-page-background");
    $page.classList.add("register-page");
    // image_container.style.backgroundImage = "url(assets/img/bg16.jpg)";
    $page.appendChild(image_container);

    this.register = this.formBuilder.group({
        userName: ['', Validators.required],
        userEmail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }
  get f() {return this.register.controls}
  onSubmit() {
    this.submitted = true;
    if (this.register.invalid) {
      return;
    }
    console.log(this.register.value);
    this.userService.register(this.register.value)

  }

  ngOnDestroy() {
    var $page = document.getElementsByClassName("full-page")[0];
    $page.classList.remove("register-page");
  }

  user_login() {
    this._router.navigate(['pages/login'])
  }
}
