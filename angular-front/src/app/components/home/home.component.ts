import { Component, OnInit, ViewChild } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';
import { LanguageService } from 'src/app/services/language.service';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  @ViewChild(EditorComponent, {static: true}) editor: EditorComponent | undefined;
  tabs: Tab[] = [
    {
      editor: {},
      title: 'New 1'
    }
  ];

  constructor(private language: LanguageService) {}

  ngOnInit(): void {
  }

  /**
   * Add new Tab
   */
  addTab(): void {
    this.tabs.push({
      editor: {},
      title: 'New '+ this.tabs.length + 1
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

  /**
   * Run code 
   */
  run(): void {
    this.isLoading = true;
    const code = this.editor?.getCode();
    if (code) {
      this.language.sendToRun(code).then(res => {
        console.log(res);
      })
      .catch(errors=> {
        console.log(errors);
      })
      .finally(() => this.isLoading = false);
    }
  }

}
