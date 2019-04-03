import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-agendamento-user',
  templateUrl: 'agendamento-user.html',
})
export class AgendamentoUserPage {

  id: any;
  nome: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.nome = navParams.get('nome');
    console.log(this.id);
    console.log(this.nome);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoUserPage');
  }

}
