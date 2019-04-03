import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'rxjs/add/operator/toPromise';
import { AdministracaoPage } from '../administracao/administracao';


@IonicPage()
@Component({
  selector: 'page-agendamento-admin',
  templateUrl: 'agendamento-admin.html',
})
export class AgendamentoAdminPage {

  id: any;
  nome: any;

  agendamento: any;

  confirmar = {id_aula:"", id_instrutor: ""};

  constructor(public loadingCtrl : LoadingController, public alertCtrl : AlertController,public http: Http ,public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.nome = navParams.get('nome');
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AgendamentoAdminPage');

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.get('https://api.smartdogtraining.com.br/administracao/solicitacaoAgendamento/solicitacoes.php')
    .toPromise().then((resposta: any)=>{
      this.agendamento = resposta.json();
    })

  }

  confirmarAula(id:any){
    let loading = this.loadingCtrl.create({
      content : "Confirmando aula",
    });

    let alert = this.alertCtrl.create({
      title : "Sucesso",
      subTitle : "Aula confirmada com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(AdministracaoPage,{
            id: this.id,
            nome: this.nome
          });
        }
      }]
    });

    loading.present();

    this.confirmar.id_aula = id;
    this.confirmar.id_instrutor = this.navParams.get('id');

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/administracao/solicitacaoAgendamento/solicitacoes.php',
      this.confirmar,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loading.dismiss();
          alert.present()
        },
        err => {
          loading.dismiss()
        }
      );
  }

}
