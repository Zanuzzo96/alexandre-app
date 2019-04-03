import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CompraDeAulaAdminPage } from '../compra-de-aula-admin/compra-de-aula-admin';

@IonicPage()
@Component({
  selector: 'page-listar-solicitacao-de-aula-admin',
  templateUrl: 'listar-solicitacao-de-aula-admin.html',
})
export class ListarSolicitacaoDeAulaAdminPage {

  id: any;
  nome: any;
  idAdmin: any;

  listaSolicitacao :any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http) {

      this.id = this.navParams.get('id');
      this.nome = this.navParams.get('nome');


      let headers: Headers = new Headers();
      headers.append('Content-type','application/json');

      this.http.get(
        'https://api.smartdogtraining.com.br/administracao/solicitacaoCompra/listagem.php'
      ).toPromise().then((resposta: any)=>{

        this.listaSolicitacao = resposta.json();

        console.log(this.listaSolicitacao)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarSolicitacaoDeAulaAdminPage');
  }

  detalheSolicitacao(id:any, usuario:any){
    this.navCtrl.push(CompraDeAulaAdminPage, {
      idAula: id,
      idUsuario: usuario,
      nome: this.nome,
      idAdmin: this.id
    });

  }

}
