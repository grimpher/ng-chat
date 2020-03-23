import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nickname-input',
  templateUrl: './nickname-input.component.html',
  styleUrls: ['./nickname-input.component.sass']
})
export class NicknameInputComponent{
  nicknameInput: FormControl;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.nicknameInput = fb.control({
      value: userService.nickname,
      disabled: userService.isNicknameLocked
    });
  }

  onChange (): void {
    const inputValue = this.nicknameInput.value;
    if (inputValue) {
      this.userService.nickname = inputValue;
    }
  }

  onLockNickname (): void {
    if(this.userService.isNicknameLocked) {
      this.userService.deleteNicknameFromStorage();
      this.nicknameInput.enable();
    } else {
      this.userService.lockNicknameInStorage(this.nicknameInput.value);
      this.nicknameInput.disable();
    }
  }
}
