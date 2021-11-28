import { Component, OnInit, ViewChild } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';
import { UserType } from 'src/app/models/user-type';
import { LanguageService } from 'src/app/services/language.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  get userType () { return UserType }
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
  }

  selectUserType(type: UserType): void {
    this.sessionService.setUserType(type);
  }
}
