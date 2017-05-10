import { Component } from '@angular/core';
import { Alert, AlertController, NavController } from 'ionic-angular';
import { LoginService } from '../../services/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private username = '';
  private password = '';

  constructor(
    private alertCtrl: AlertController,
    private loginService: LoginService,
    private navCtrl: NavController
  ) {}

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.login();
    }
  }

  login(): void {
    this.loginService.login(this.username, this.password).then(() => {
      this.navCtrl.setRoot(HomePage, {}, {
        animate: true
      });
    }).catch((e) => {
      this.handleError(e);
    });

  }

  register(): void {
    this.loginService.register(this.username, this.password).then(() => {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile": {
        "name":'',
        "radius":0,
        "classes":[],
        "options":[
          {name:'Tutoring', value:'1', checked:false},
          {name:'Lessons', value:'2', checked:false},
          {name:'Tour Guide', value:'3', checked:false},
          {name:'Miscellaneous', value:'4', checked:false}],
      }}});
      this.navCtrl.setRoot(HomePage, {}, {
        animate: true
      });
    }).catch((e) => {
      this.handleError(e);
    });

  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }

}
