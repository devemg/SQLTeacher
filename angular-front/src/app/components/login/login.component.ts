import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  get loginControls () { return this.loginForm?.controls }
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submit(): void {
    console.log(this.loginForm?.value);
    if (this.loginForm?.valid) {
      this.router.navigate(['home']);
    }
  }

}
