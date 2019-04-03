import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhe-aula-usuario',
  templateUrl: 'detalhe-aula-usuario.html',
})
export class DetalheAulaUsuarioPage {

  detalheAula = {
    id_aula:'', data:'',  hora:'',  animal:'',  status:'',  conteudo:'', nome_user:'', id_user:''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.detalheAula.id_aula = this.navParams.get('id_aula');
      this.detalheAula.data = this.navParams.get('data');
      this.detalheAula.hora = this.navParams.get('hora');
      this.detalheAula.animal = this.navParams.get('animal');
      this.detalheAula.status = this.navParams.get('status');
      this.detalheAula.conteudo = this.navParams.get('conteudo');
      this.detalheAula.nome_user = this.navParams.get('nome_user');
      this.detalheAula.id_user = this.navParams.get('id_user');
  }

  ionViewDidLoad() { }

}
