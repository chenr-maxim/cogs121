import { Injectable } from '@angular/core';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Platform } from 'ionic-angular';

@Injectable()
export class LoginService {
  constructor(private platform: Platform) {

  }

  login(user: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Accounts.createUser({username: user, password: password}, (e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.logout((e: Error) => {
        if (e) {
          return reject(e);
        }

        resolve();
      });
    });
  }
}