import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { merge } from 'rxjs/operators';

// interfaces
import { Message } from './interfaces/messageInterface';

// services
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // make two observables from events and emit all of the new messages in messages observable
  private initialMessages$ = this.socket.fromEvent<Message[]>('initial messages');
  private newMessages$ = this.socket.fromEvent<Message[]>('message');
  messages$ = this.initialMessages$.pipe(merge(this.newMessages$));
  
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private socket: Socket
  ) { }

  public postNewMessage (messageContent: string): void {
    const messageData = {
      content: messageContent,
      author: this.userService.nickname
    }
    this.socket.emit('message', messageData);
  }
}
