import { Component, OnInit, ViewChild } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
