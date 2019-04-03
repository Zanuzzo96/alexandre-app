import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { InstrutorPage } from '../instrutor/instrutor'


@IonicPage()
@Component({
  selector: 'page-valida-aula-instrutor',
  templateUrl: 'valida-aula-instrutor.html',
})
export class ValidaAulaInstrutorPage {

  id_user: any;
  usuario: any;

  id: any;
  data: any;
  hora: any;
  nome: any;
  animal: any;

  aula = {
    "conteudoAula": "",
    "id":""
  }

  constructor(public loadingCtrl : LoadingController,public alertCtrl : AlertController, public http: Http ,public navCtrl: NavController, public navParams: NavParams){
    this.id = navParams.get('id');
    this.data = navParams.get('data');
    this.hora = navParams.get('hora');
    this.nome = navParams.get('nome');
    this.animal = navParams.get('animal');

    this.aula.id = this.id;

    this.id_user = navParams.get('id_user');
    this.usuario = navParams.get('usuario');


  }

  ionViewDidLoad() {  }


  validarAula(){
    let sucessoAlert = this.alertCtrl.create({
      title : "Sucesso",
      subTitle : "Aula validada com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(InstrutorPage, {
            id: this.id_user,
            nome: this.usuario
          });
        }
      }]
    });

    let loading = this.loadingCtrl.create({
      content : 'Validando Aula',
    });

    loading.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/instrutor/aula/',
      this.aula,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loading.dismiss();
          sucessoAlert.present();
        },
        err => {
          console.log("Error occured");
          loading.dismiss();

        }
      );
  }

}
