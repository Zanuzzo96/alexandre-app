import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-controle-aulas-admin',
  templateUrl: 'controle-aulas-admin.html',
})
export class ControleAulasAdminPage {

  aulas: string="pendentes"

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControleAulasAdminPage');
  }

}
