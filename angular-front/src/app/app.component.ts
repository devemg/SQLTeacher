import { Component } from '@angular/core';
import { UserType } from './models/user-type';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}
