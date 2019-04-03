import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AdministracaoPage } from '../administracao/administracao';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-compra-de-aula-admin',
  templateUrl: 'compra-de-aula-admin.html',
})
export class CompraDeAulaAdminPage {

  id:any;
  usuario: any;
  dados: any;
  dadosSolicitacao = {
      "aulas": "",
      "necessidade": "",
      "observacao": "",
      "temperamento": "",
      "nome":"",
      "endereco":"",
      "valor": ""
  };

  retorno = {
    "id": "",
    "valor": ""
  }

  aulaPaga = {
    "aulaPaga": "paga",
    "id" : "",
    "id_user": "",
    "quantidade": ""
  }

  nome: any;
  admin: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController   ) {

      let loading = this.loadingCtrl.create({
          content : 'Carregando dados',
      });

      loading.present();

      this.usuario = navParams.get('idUsuario');
      this.aulaPaga.id_user = navParams.get('idUsuario');
      this.id = navParams.get('idAula');
      this.retorno.id = navParams.get('idAula');
      this.aulaPaga.id = navParams.get('idAula');
      this.nome = navParams.get('nome');
      this.admin = navParams.get('idAdmin');

      let headers: Headers = new Headers();
      headers.append('Content-type','application/json');

      this.http.get(
        'https://api.smartdogtraining.com.br/administracao/solicitacaoCompra/index.php?aula='+ this.id
      ).toPromise().then((resposta: any)=>{

        this.dados = resposta.json();
        this.dadosSolicitacao.aulas = this.dados[0].qtd_aulas;
        this.dadosSolicitacao.necessidade = this.dados[0].necessidade;
        this.dadosSolicitacao.observacao = this.dados[0].observacoes;
        this.dadosSolicitacao.temperamento = this.dados[0].temperamento;
        this.dadosSolicitacao.nome = this.dados[0].nome;
        this.dadosSolicitacao.endereco = this.dados[0].endereco;
        this.dadosSolicitacao.valor = this.dados[0].valor_orcado;

        this.aulaPaga.quantidade = this.dadosSolicitacao.aulas;

        loading.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraDeAulaAdminPage');
  }

  enviarRetorno(){

    this.retorno.valor = this.dadosSolicitacao.valor;

    let alert1 = this.alertCtrl.create({
      title : "Sucesso",
      subTitle : "Retorno enviado com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(AdministracaoPage,{
            id: this.admin,
            nome: this.nome
          })
        }
      }]
    });

    let alertErro1 = this.alertCtrl.create({
      title : "Algo deu errado",
      subTitle : "Tente novamente",
      buttons : [{
        text: "OK"
      }]
    });

    let loading1 = this.loadingCtrl.create({
        content : 'Enviando retorno',
    });

    loading1.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/administracao/solicitacaoCompra/index.php',
      this.retorno,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loading1.dismiss();
          alert1.present();
        },
        err => {
          loading1.dismiss();
          alertErro1.present();
        }
      );
    }

  definirPaga(){

    let alert2 = this.alertCtrl.create({
      title : "Sucesso",
      subTitle : "Aula definida como paga com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(AdministracaoPage,{
            id: this.admin,
            nome: this.nome
          })
        }
      }]
    });

    let alertErro2 = this.alertCtrl.create({
      title : "Algo deu errado",
      subTitle : "Tente novamente",
      buttons : [{
        text: "OK",
      }]
    });

    let loading2 = this.loadingCtrl.create({
        content : 'Definindo aula como paga',
    });

    loading2.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post('https://api.smartdogtraining.com.br/administracao/solicitacaoCompra/index.php',this.aulaPaga,new RequestOptions({ headers: headers }))
    .subscribe(res => {
          //aqui colocar um console pra ver a resposta fazer um select e um update somando as aulas que já tinha com as que foram compradas nessas solicitacoes
          console.log(res);
          loading2.dismiss();
          alert2.present();
        },
        err => {
          loading2.dismiss();
          alertErro2.present();
        }
      );
    }


    excluirSolicitacao(){

      let alertApagado = this.alertCtrl.create({
        subTitle : "Solicitação de compra excluida com sucesso",
        buttons : [{
          text: "OK",
          handler : ()=>{
            this.navCtrl.push(AdministracaoPage,{
              id: this.admin,
              nome: this.nome
            })
          }
        }]
      });

      let loading3 = this.loadingCtrl.create({
          content : 'Apagando aula',
      });

      loading3.present();

      this.http.delete('https://api.smartdogtraining.com.br/administracao/solicitacaoCompra/index.php?aula='+ this.id ).toPromise().then((response)=>{
        loading3.dismiss();
        alertApagado.present();
      }).catch((response)=>{
        loading3.dismiss()
        console.log('erro na requisicao1');
      });
    }

}
