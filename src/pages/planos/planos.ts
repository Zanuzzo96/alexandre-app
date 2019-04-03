import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { UsuarioPage } from '../usuario/usuario';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-planos',
  templateUrl: 'planos.html',
})
export class PlanosPage {

   id: any;
   nome: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController  ) {
      this.id = this.navParams.get('id');
      this.nome = this.navParams.get('nome');
  }

  ionViewDidLoad() {

  }

  solicitacao = { "qtdAula":"", "mudanca":"","temperamentoAnimal":"","observacao":"" , "id_user":  "" };

  solicitarAulas(){

    this.solicitacao.id_user = this.id;


    console.log(this.solicitacao );

    let loading = this.loadingCtrl.create({
      content : '<h6 class="alerta">Fazendo a solicitação das aulas</h6>',
    });

    let alert = this.alertCtrl.create({
      title : "<h2 text-center>Sucesso</h2>",
      subTitle : "Solicitação enviada com sucesso, Aguarde nosso retorno",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(UsuarioPage, {
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
      'https://api.smartdogtraining.com.br/aulas/solicitarCompra/',
      this.solicitacao,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loading.dismiss();
          alert.present();
        },
        err => {
          console.log("Error occured");
          loading.dismiss();

        }
      );

  }

}
