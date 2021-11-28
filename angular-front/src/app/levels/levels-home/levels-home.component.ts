import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/models/user-type';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-levels-home',
  templateUrl: './levels-home.component.html',
  styleUrls: ['./levels-home.component.scss']
})
export class LevelsHomeComponent implements OnInit {
  
  get userType () { return UserType }
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
  }

  selectUserType(type: UserType): void {
    this.sessionService.setUserType(type);
  }

}
