import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'rxjs/add/operator/toPromise';
import { InstrutorPage } from '../instrutor/instrutor';


@IonicPage()
@Component({
  selector: 'page-notificacao-instrutor',
  templateUrl: 'notificacao-instrutor.html',
})
export class NotificacaoInstrutorPage {

  id: any;
  nome: any;

  notificacao: any;

  confirmacao = { id_aula : "" };

  constructor(public loadingCtrl : LoadingController, public alertCtrl : AlertController,public http : Http, public navCtrl: NavController, public navParams: NavParams ) {
    this.id = navParams.get('id');
    this.nome = navParams.get('nome');

    this.http.get('https://api.smartdogtraining.com.br/instrutor/solicitacoes/index.php?instrutor='+ this.id).toPromise().then((response)=>{
      this.notificacao = response.json();
      console.log(this.notificacao)
    }).catch((response)=>{
      console.log('erro na requisicao2');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacaoInstrutorPage');
  }

  confirmarAula(id: any){

    this.confirmacao.id_aula = id;

      let loading = this.loadingCtrl.create({
        content : "Confirmando aula",
      });

      let alert = this.alertCtrl.create({
        title : "Sucesso",
        subTitle : "Aula confirmada com sucesso",
        buttons : [{
          text: "OK",
          handler : ()=>{
            this.navCtrl.push(InstrutorPage,{
              id: this.id,
              nome: this.nome
            });
          }
        }]
      });

      loading.present();

      let headers: Headers = new Headers();
      headers.append('Content-type','application/json');

      this.http.post(
        'https://api.smartdogtraining.com.br/instrutor/solicitacoes/index.php',
        this.confirmacao,
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
