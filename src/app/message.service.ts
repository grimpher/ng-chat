import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

// interfaces
import { Message } from './interfaces/messageInterface';
import { ApiResponse } from './interfaces/apiResponseInterface';

// env
import { environment } from '../environments/environment';

// services
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = new Subject<Message[]>();
  lastRequestTimestamp: number = 0;

  constructor(private http: HttpClient, private userService: UserService) {
    this.fetchNewMessages();
    setInterval(() => {
      if (this.lastRequestTimestamp + 2000 <= new Date().getTime()) 
        this.fetchNewMessages();
    }, 500)
  }

  public fetchNewMessages (): void {
    this.fetchNewMessagesFromApi()
      .subscribe(res => {
        this.lastRequestTimestamp = new Date().getTime();
        if(res.messages && res.messages.length)
          this.messages.next(res.messages);
      });
  }

  public postNewMessage (messageContent: string): void {
    this.postNewMessageToApi(messageContent).subscribe(res => {
      this.messages.next(res.messages);
    })
  }

  private postNewMessageToApi (messageContent: string): Observable<ApiResponse<Message[]>> {
    const newMessage = {
      content: messageContent,
      author: this.userService.nickname
    }
    return this.http.post<ApiResponse<Message[]>>(`${environment.apiEndpoint}/messages`, newMessage);
  }

  private fetchNewMessagesFromApi (): Observable<ApiResponse<Message[]>> {
    return this.http.get<ApiResponse<Message[]>>(`${environment.apiEndpoint}/messages?since=${this.lastRequestTimestamp}`); 
  }
}
