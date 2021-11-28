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
  background: string = '';
  constructor(private sessionService: SessionService) {
    this.sessionService.getUserTypeObservable().subscribe((type: UserType) => {
      switch (type) {
        case UserType.INTERMEDIATE:
          this.background = 'bg-green';
          break;
        case UserType.BEGINNER:
          this.background = 'bg-blue';
          break;
        case UserType.ADVANCED:
        case UserType.NULL:
          this.background = 'bg-pink';
          break;
      }
    });
  }

  ngOnInit(): void {
    
  }
}
