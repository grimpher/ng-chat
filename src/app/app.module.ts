// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// services
import { MessageService } from './message.service';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';

// components
import { AppComponent } from './app.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { NicknameInputComponent } from './nickname-input/nickname-input.component';

// environments
import { environment } from '../environments/environment';

// Socket.io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.wsEndpoint, options: { } }

@NgModule({
  declarations: [
    AppComponent,
    MessageInputComponent,
    NicknameInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MaterialModule,

    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    SocketIoModule.forRoot(config)
  ],
  providers: [
    MessageService,
    UserService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
