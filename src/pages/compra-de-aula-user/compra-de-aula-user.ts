import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-compra-de-aula-user',
  templateUrl: 'compra-de-aula-user.html',
})
export class CompraDeAulaUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraDeAulaUserPage');
  }

}
