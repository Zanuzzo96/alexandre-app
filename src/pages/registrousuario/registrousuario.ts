import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-registrousuario',
  templateUrl: 'registrousuario.html',
})

export class RegistrousuarioPage {

  usuario = {"nome":"","cpf":"","rg":"","nasc":"","contato":"","endereco":"","nomeAnimal":"","raca":"","sexo":"","idade":"","castrado":"","login":"","senha":"","permissao":"user"};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrousuarioPage');
  }

  adicionarUsuario(){
    console.log(this.usuario);// antes de buildar a aplicação tirar isso

      let loading = this.loadingCtrl.create({
        content : "Salvando dados",
      });

      let alert = this.alertCtrl.create({
        title : "<h2 text-center>Sucesso</h2>",
        subTitle : "Usuário inserido com sucesso",
        buttons : [{
          text: "OK",
          handler : ()=>{
            this.navCtrl.push(HomePage);
          }
        }]
      });

      let alertUsuarioErro = this.alertCtrl.create({
        title : "<h2 text-center>Temos um problema</h2>",
        subTitle : "CPF ou RG já cadastrado anteriormente",
        buttons : [{
          text: "OK"
        }]
      });

      let alertErro = this.alertCtrl.create({
        title : "<h2 text-center>Algo deu errado</h2>",
        subTitle : "Tente realizar o registro novamente, persistindo o erro entre em contato com a Smart Dog Training",
        buttons : [{
          text: "OK",

        }]
      });

      loading.present();

      let headers: Headers = new Headers();
      headers.append('Content-type','application/json');

      this.http.post(
        'https://api.smartdogtraining.com.br/usuario/',
        this.usuario,
        new RequestOptions({ headers: headers })
      ).subscribe(
          res => {
            console.log(res.json());
            loading.dismiss();
            if(res.json() == "CPF ou RG já cadastrado anteriormente"){
              alertUsuarioErro.present();
            }else{
              alert.present();
            }
          },
          err => {
            loading.dismiss();
            alertErro.present();
          }
        );
  }

}
