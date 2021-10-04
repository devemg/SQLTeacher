import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tabs: Tab[] = [
    {
      editor: {},
      title: 'New 1'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Add new Tab
   */
  addTab(): void {
    this.tabs.push({
      editor: {},
      title: 'New '+ this.tabs.length
    });
  }

  /**
   * Remove tab
   * @param index of tab
   */
  closeTab(index: number): void {
    if (index >=0 && index < this.tabs.length) {
      this.tabs.splice(index, 1);
    }
    if (this.tabs.length == 0) {
      this.tabs.push({
        editor: {},
        title: 'New 1'
      });
    }
  }

}
