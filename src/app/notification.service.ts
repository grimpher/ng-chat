import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  originalTabTitle: string = document.title;

  constructor(private messageService: MessageService) {
    this.messageService.messages$.subscribe(messages => {
      // console.log(messages.length)
    })
   }

  onNewMessage (newMessagesCount: number): void {
    document.title = newMessagesCount + ' new messages';
    console.log(newMessagesCount);
  }

}
