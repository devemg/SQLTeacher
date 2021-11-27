import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { EditorComponent } from './components/editor/editor.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CredentialsMessageComponent } from './components/login/credentials-message/credentials-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    LoginComponent,
    CredentialsMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
