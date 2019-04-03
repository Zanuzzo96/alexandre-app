import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import { ValidaAulaInstrutorPage } from '../valida-aula-instrutor/valida-aula-instrutor';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-agenda-instrutor',
  templateUrl: 'agenda-instrutor.html',
})
export class AgendaInstrutorPage {

  id: any;
  nome: any;

  agenda: any;

  constructor(public loadingCtrl: LoadingController,public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.nome = navParams.get('nome');
    console.log(this.id);
    console.log(this.nome);
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content : 'Carregando agenda',
    });

    loading.present();

    this.http.get('https://api.smartdogtraining.com.br/instrutor/agenda/index.php?instrutor='+ this.id).toPromise().then((response)=>{
      this.agenda = response.json();
      loading.dismiss();
    }).catch((response)=>{
      console.log('erro na requisicao2');
      loading.dismiss();
    });



  }

  validarAula(id: any,data: any, hora: any, nome: any, animal: any,){
    this.navCtrl.push(ValidaAulaInstrutorPage,{
      id: id,
      data: data,
      hora: hora,
      nome: nome,
      animal: animal,
      id_user:this.id,
      usuario:this.nome
    });
  }

}
