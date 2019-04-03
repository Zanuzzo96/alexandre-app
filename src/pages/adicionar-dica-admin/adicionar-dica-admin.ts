import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DicasProvider } from '../../providers/dicas/dicas';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AdministracaoPage } from '../administracao/administracao';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-adicionar-dica-admin',
  templateUrl: 'adicionar-dica-admin.html',
})
export class AdicionarDicaAdminPage {
  id: any;
  nome: any;

  dicas : string="adicionar" ;

  listagemDicas : any;

  conteudoDica = {
    "titulo": "",
    "dica": ""
  }

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,public http: Http,public navCtrl: NavController, public navParams: NavParams,private dicasProvider : DicasProvider) {
    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
  }

  ionViewDidLoad() {
    console.log('voce esta na pagina de dicas admin');
    this.dicasProvider.listarDicas().then((response)=>{

      this.listagemDicas = response.json();
      console.log(this.listagemDicas)

    }).catch((response)=>{
      console.log('erro na requisicao');
    })
  }

  adicionarDica(){

    let loading = this.loadingCtrl.create({
      content : "Inserindo dica",
    });

    let alerta = this.alertCtrl.create({
      subTitle : "Dica inserida com suceso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(AdministracaoPage,{
            id: this.id,
            nome: this.nome
          });
        }
      }]
    });

    loading.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post('https://api.smartdogtraining.com.br/dicas/index.php',this.conteudoDica, new RequestOptions({ headers: headers }))
    .subscribe(
        res => {
          loading.dismiss();
          alerta.present();
        },
        err => {
          loading.dismiss();
        }
      );
    }

  excluirDica(id:any){

    let loading = this.loadingCtrl.create({
      content : "Excluindo dica",
    });

    let alerta = this.alertCtrl.create({
      subTitle : "Dica excluida com suceso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(AdministracaoPage,{
            id: this.id,
            nome: this.nome
          });
        }
      }]
    });

    loading.present();

    this.http.delete('https://api.smartdogtraining.com.br/dicas/index.php?aula='+ id ).toPromise().then((response)=>{
        loading.dismiss();
        alerta.present();
    }).catch((response)=>{
      loading.dismiss();
      console.log('erro na requisicao1');
    });
  }

}
