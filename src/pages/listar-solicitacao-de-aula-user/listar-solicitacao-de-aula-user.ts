import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import { UsuarioPage } from  '../usuario/usuario';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-listar-solicitacao-de-aula-user',
  templateUrl: 'listar-solicitacao-de-aula-user.html',
})
export class ListarSolicitacaoDeAulaUserPage {

  id: any;
  nome: any;
  compra: any;

  pagamento = {"valor":'',"quantidade":'',"user":""}

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.nome = navParams.get('nome');
  }

  ionViewDidLoad() {
    this.http.get('https://api.smartdogtraining.com.br/usuario/solicitacao/compra.php?usuario='+ this.id).toPromise().then((response)=>{
      this.compra = response.json();

      console.log(response.json());

    }).catch((response)=>{
      console.log('erro na requisicao1');
    });
  }

  concluirCompra(valor: any, quantidade:any){
    window.open('http://www.api.smartdogtraining.com.br/pagamento/index.php?valor=' + valor + '&quantidade=' + quantidade + '&usuario=' + this.id);
    this.navCtrl.push(UsuarioPage,{
      id: this.id,
      nome: this.nome
    });
  }


  cancelaCompra(id: any){
    this.http.delete('https://api.smartdogtraining.com.br/usuario/solicitacao/compra.php?aula='+ id ).toPromise().then((response)=>{
        this.navCtrl.push(UsuarioPage,{
          id: this.id,
          nome: this.nome
        })
    }).catch((response)=>{
      console.log('erro na requisicao1');
    });
  }

}
