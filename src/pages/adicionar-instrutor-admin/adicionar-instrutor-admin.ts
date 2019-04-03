import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { AdministracaoPage } from '../administracao/administracao';

@IonicPage()
@Component({
  selector: 'page-adicionar-instrutor-admin',
  templateUrl: 'adicionar-instrutor-admin.html',
})
export class AdicionarInstrutorAdminPage {

  instrutores: string="adicionar";
  listarInstrutores : any;

  id: any;
  nome: any;

  constructor(
    public navCtrl : NavController,
    public navParams : NavParams,
    private usuarioProvider : UsuarioProvider,
    public http : Http,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    public actionSheetCtrl : ActionSheetController) {

      this.id = this.navParams.get('id');
      this.nome = this.navParams.get('nome');
     console.log(this.id);
     console.log(this.nome);

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AdicionarInstrutorAdminPage');

    this.usuarioProvider.listarInstrutor().then((response)=>{

      this.listarInstrutores = response.json();

    }).catch((response)=>{
      console.log('erro na requisicao');
    })

  }

  instrutor = {"nome":"", "cpf":"","rg":"", "nasc":"", "contato":"", "endereco":"","login" : "" , "senha" : "" , "nivel" : "instrutor"};

  adicionarInstrutor(){
    console.log(this.instrutor);

    let loading = this.loadingCtrl.create({
      content : "Adicionando Instrutor",
    });

    let alert = this.alertCtrl.create({
      title : "<h2 text-center>Sucesso</h2>",
      subTitle : "Usuário inserido com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(AdministracaoPage,{
            id: this.id,
            nome:this.nome
          });
        }
      }]
    });

    loading.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/instrutor/',
      this.instrutor,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          console.log(res);

          loading.dismiss();
          alert.present();
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  opcoes(){
    let opcoesInstrutor = this.actionSheetCtrl.create({
      buttons: [
        {
          text : "Ver agenda do instrutor",
          icon : 'ios-calendar-outline'
        },
        {
          text : "Ver perfil do instrutor",
          icon : 'ios-person-outline'
        },
        {
          text : "Bloquiar / Desbloquiar instrutor",
          icon : 'ios-close-outline'
        },
        {
          text : "Cancelar",
          icon : 'ios-exit-outline'
        }
      ]
    });

    opcoesInstrutor.present();

  }

}
