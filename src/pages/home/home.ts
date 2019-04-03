import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegistrousuarioPage } from '../registrousuario/registrousuario';
import { UsuarioPage } from '../usuario/usuario';
import { InstrutorPage } from '../instrutor/instrutor';
import { AdministracaoPage } from '../administracao/administracao';

import { Headers, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public http : Http,public loadingCtrl : LoadingController,public alertCtrl : AlertController) {

  }

//abrir o registro
  abrirRegistro(){
    this.navCtrl.push(RegistrousuarioPage);
  }

//parte de login no app
  login = {"usuario":"", "senha":""};
  retornoLogin : any;
  permissaoAcesso : any;

  entrar(){

    let loading = this.loadingCtrl.create({
      content : "Processando o acesso",
    });

    let alertErro = this.alertCtrl.create({
      title : "Algo deu errado",
      subTitle : "Usuário não encontrado, verifique o login e senha e tente novamente",
      buttons : [{
        text: "OK",
      }]
    });

    loading.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.get(
      'https://api.smartdogtraining.com.br/login/index.php?usuario='+ this.login.usuario + '&senha=' + this.login.senha
    ).toPromise().then((resposta: any)=>{

      this.retornoLogin = resposta.json();

      this.permissaoAcesso = this.retornoLogin[0].permissao;

      if(this.permissaoAcesso == 'user'){
        loading.dismiss();
        this.navCtrl.push(UsuarioPage, {
          id: this.retornoLogin[0].id,
          nome: this.retornoLogin[0].nome
        });
      }

      if(this.permissaoAcesso == 'instrutor'){
        loading.dismiss();
        this.navCtrl.push(InstrutorPage,{
          id: this.retornoLogin[0].id,
          nome : this.retornoLogin[0].nome
        });
      }

      if(this.permissaoAcesso == 'admin'){
        loading.dismiss();
        this.navCtrl.push(AdministracaoPage, {
          id : this.retornoLogin[0].id,
          nome : this.retornoLogin[0].nome
        });
      }

      if(this.retornoLogin == 'Usuário não encontrado'){
        loading.dismiss();
        alertErro.present();
      }

    }).catch((resposta)=>{
      loading.dismiss();
      alertErro.present();
    });

  }
}
