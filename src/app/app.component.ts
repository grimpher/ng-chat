import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Message } from './interfaces/messageInterface';
import { MessageService } from './message.service';
import { NotificationService } from './notification.service';

import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChild("scrollableList", {read: ElementRef, static: true}) scrollableList: ElementRef;

  messages: Message[] = [];
  isScrolledManually: boolean = false;

  constructor(
    private messageService: MessageService, 
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // this.messageService.messages.subscribe(messages => {
    //   this.onNewMessages(messages);
    // }); 
    this.messageService.messages.subscribe(messages => {
      this.onNewMessages(messages);
    })
  }

  onNewMessages (newMessages: Message[]): void {
    // filter out messages that already exists
    newMessages = newMessages.filter(message => 
      !this.messages.find(mes => mes.id === message.id)
    );

    this.messages.push(...newMessages);

    // scroll to bottom if user didn't scroll to top manually
    if (!this.isScrolledManually) {
      this.scrollChatToBottom();
    }
  }

  onScrollToBottom (): void {
    this.isScrolledManually = false;
    this.scrollChatToBottom();
  }

  onScroll (): void {
    // chcek if user scrolled higher than 100 pixels from the bottom of the list
    const $listEl = this.scrollableList.nativeElement;
    this.isScrolledManually = $listEl.scrollTop + $listEl.offsetHeight + 100 <= $listEl.scrollHeight;
  }

  // utility to scroll list to bottom
  private scrollChatToBottom (): void {
    // scroll to bottom after 100ms to be sure that new element appeared in DOM
    setTimeout (() => {
      const $listEl = this.scrollableList.nativeElement;
      $listEl.scrollTop = $listEl.scrollHeight;
    }, 100)
  }
}
