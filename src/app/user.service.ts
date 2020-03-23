import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  nickname: string;
  isNicknameLocked: boolean;

  constructor() {
    if (localStorage.savedNickname) {
      // get nickname from localStorage
      this.nickname = localStorage.savedNickname;
      this.isNicknameLocked = true;
    } else {
      // set default nickname of pattern userXXXX
      this.nickname = 'user' + Math.floor(Math.random() * 10000);
      this.isNicknameLocked = false;
    }
  }

  lockNicknameInStorage (newNickname: string): void {
    if(newNickname) 
      localStorage.setItem('savedNickname', newNickname);
    this.isNicknameLocked = true;
  }

  deleteNicknameFromStorage (): void {
    localStorage.removeItem('savedNickname');
    this.isNicknameLocked = false;
  }
}
