import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.sass']
})
export class MessageInputComponent {
  messageInput: FormControl;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.messageInput = fb.control('');
  }

  onMessageSend ($event) {
    if (!this.messageInput.value) return

    this.messageService.postNewMessage(this.messageInput.value);
    this.messageInput.setValue('');
  }

}
