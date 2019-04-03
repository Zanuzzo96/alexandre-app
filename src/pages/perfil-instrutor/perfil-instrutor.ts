import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { InstrutorPage } from '../instrutor/instrutor';

@IonicPage()
@Component({
  selector: 'page-perfil-instrutor',
  templateUrl: 'perfil-instrutor.html',
})
export class PerfilInstrutorPage {

  id: any;
  dadosPerfil : any;
  nome:any

  instrutor = {
    id:'',
    nome:'',
    cpf:'',
    rg:'',
    nasc:'',
    contato:'',
    endereco:'',
    login:'',
    senha:''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController ) {

    let loading = this.loadingCtrl.create({
        content : 'Carregando dados do perfil',
    });

    loading.present();

    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
    console.log(this.id);
    console.log(this.nome);

    this.http.get('https://api.smartdogtraining.com.br/instrutor/perfil/index.php?instrutor='+ this.id).toPromise().then((response)=>{
      this.dadosPerfil = response.json();
      console.log(this.dadosPerfil);

      this.instrutor.id = this.id;
      this.instrutor.nome = this.dadosPerfil[0].nome;
      this.instrutor.cpf = this.dadosPerfil[0].cpf;
      this.instrutor.rg = this.dadosPerfil[0].rg;
      this.instrutor.nasc = this.dadosPerfil[0].nascimento;
      this.instrutor.contato = this.dadosPerfil[0].contato;
      this.instrutor.endereco = this.dadosPerfil[0].endereco;
      this.instrutor.login = this.dadosPerfil[0].login;
      this.instrutor.senha = this.dadosPerfil[0].senha;

      loading.dismiss();

  });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilInstrutorPage');
  }

  atualizarInstrutor(){

    this.nome = this.instrutor.nome;

    let loading2 = this.loadingCtrl.create({
        content : 'Atualizando dados do perfil',
    });

    let alert2 = this.alertCtrl.create({
      title : "<h2 text-center>Sucesso</h2>",
      subTitle : "Solicitação enviada com sucesso, Aguarde nosso retorno",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(InstrutorPage, {
            id: this.id,
            nome: this.nome
          });
        }
      }]
    });

    loading2.present();


    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/instrutor/perfil/',
      this.instrutor,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          console.log(res);
          loading2.dismiss();
          alert2.present();
        },
        err => {
          loading2.dismiss();

        }
      );
  }

}
