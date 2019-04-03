import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-aulas-instrutor',
  templateUrl: 'aulas-instrutor.html',
})
export class AulasInstrutorPage {

  id: any;
  nome: any;

  alunos: any;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
      this.id = navParams.get('id');
      this.nome = navParams.get('nome');

      console.log(this.id);
      console.log(this.nome);
  }

  ionViewDidLoad() {
    console.log('Aulas Instrutor');

    this.http.get('https://api.smartdogtraining.com.br/instrutor/aula/index.php?instrutor='+ this.id).toPromise().then((response)=>{
        this.alunos = response.json();
    }).catch((response)=>{
        console.log('erro na requisicao2');
    });
  }

}
