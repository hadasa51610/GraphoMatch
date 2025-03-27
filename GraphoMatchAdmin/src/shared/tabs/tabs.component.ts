import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent implements AfterContentInit {
  @Input() activeTab = ""
  @Output() tabChange = new EventEmitter<string>()
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>

  ngAfterContentInit() {
    // If no active tab is set, use the first tab
    if (!this.activeTab && this.tabs.first) {
      this.activeTab = this.tabs.first.tabId
    }

    // Set active state based on activeTab
    this.selectTab(this.activeTab)
  }

  selectTab(tabId: string) {
    this.activeTab = tabId
    this.tabs.forEach((tab) => {
      tab.active = tab.tabId === tabId
    })
    this.tabChange.emit(tabId)
  }
}
