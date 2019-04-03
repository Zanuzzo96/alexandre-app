import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'rxjs/add/operator/toPromise';
import { UsuarioPage } from '../usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-adicionar-animal-modal',
  templateUrl: 'adicionar-animal-modal.html',
})
export class AdicionarAnimalModalPage {

  id : number;
  nome : any;
  animal = {
    "id_user": "",
    "nomeAnimal": "",
    "raca": "",
    "sexo": "",
    "idade": "",
    "castrado": ""
  };

  constructor( public loadingCtrl: LoadingController, public alertCtrl: AlertController , public http: Http ,public viewCtrl: ViewController ,public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
    this.animal.id_user = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarAnimalModalPage');
  }

  voltar(){
    this.viewCtrl.dismiss()
  }

  adicionarAnimal(){
    console.log(this.animal);

    let loading = this.loadingCtrl.create({
      content : 'Carregando dados do perfil',
    });
    loading.present();

    let alertSucesso = this.alertCtrl.create({
      title : "<h2 text-center>Sucesso</h2>",
      subTitle : "Adicionado animal com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(UsuarioPage,{
            id: this.id,
            nome: this.nome
          });
        }
      }]
    });

    let alertErro = this.alertCtrl.create({
      title : "<h2 text-center>Erro</h2>",
      subTitle : "Ocorreu um erro ao adicionar os dados, tente novamente",
      buttons : [{
        text: "OK",
      }]
    });

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/usuario/perfilAnimal/',
      this.animal,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loading.dismiss();
          alertSucesso.present();
        },
        err => {
          loading.dismiss();
          alertErro.present();
        }
      );
  }

}
