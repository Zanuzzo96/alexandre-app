import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendaInstrutorPage } from '../agenda-instrutor/agenda-instrutor';
import { AulasInstrutorPage } from '../aulas-instrutor/aulas-instrutor';
import { NotificacaoInstrutorPage } from '../notificacao-instrutor/notificacao-instrutor';
import { PerfilInstrutorPage } from '../perfil-instrutor/perfil-instrutor';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-instrutor',
  templateUrl: 'instrutor.html',
})
export class InstrutorPage {

    id: any;
    nome: any;

    solicitacao: any;

    dadosAula: any;
    dataAula: any;
    horaAula: any;

    constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams ) {
        this.id = navParams.get('id');
        this.nome = navParams.get('nome');

        //pegando a proxima aula que o instrutor tem
        this.http.get('https://api.smartdogtraining.com.br/instrutor/home/index.php?instrutor='+ this.id).toPromise().then((response)=>{
          this.dadosAula = response.json();
          this.dataAula = this.dadosAula[0].data;
          this.horaAula = this.dadosAula[0].hora;
        }).catch((response)=>{
          console.log('erro na requisicao0');
        });
    }

    ionViewDidLoad() {
      //pegando o numero de solicitacoes para confirmacao
      this.http.get('https://api.smartdogtraining.com.br/instrutor/home/solicitacao.php?instrutor='+ this.id).toPromise().then((response)=>{
        this.solicitacao = response.json();
      }).catch((response)=>{
        console.log('erro na requisicao2');
      });
    }

  agenda_instrutor(){
    this.navCtrl.push(AgendaInstrutorPage,{
      id: this.id,
      nome: this.nome
    });

  }

  controle_aulas(){
    this.navCtrl.push(AulasInstrutorPage,{
      id: this.id,
      nome:this.nome
    })
  }

  solicitacoes(){
    this.navCtrl.push(NotificacaoInstrutorPage, {
      id: this.id,
      nome: this.nome
    })
  }

  perfil(){
    this.navCtrl.push(PerfilInstrutorPage, {
      id: this.id,
      nome: this.nome
    })
  }

  sair(){
    this.navCtrl.push(HomePage);
  }



}
