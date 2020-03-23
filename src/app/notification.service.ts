import { Injectable, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  originalTabTitle: string = document.title;

  constructor(private messageService: MessageService) { }

  ngOnInit (): void {
    this.messageService.messages.subscribe({
      next (messages) {
        console.log(messages);
        // const newMessagesCount: number = messages.length;
        // this.onNewMessage(newMessagesCount);
      }
    })
  }

  onNewMessage (newMessagesCount: number): void {
    document.title = newMessagesCount + ' new messages';
    console.log(newMessagesCount);
  }

}
