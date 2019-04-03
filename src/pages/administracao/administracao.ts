import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
//essa importação é pro admin ver as suas aulas e a agenda fica igual a do instrutor
import { AgendaInstrutorPage } from '../agenda-instrutor/agenda-instrutor';
//daqui pra baixo são exclusividades do administracao
import { ControleAulasAdminPage } from '../controle-aulas-admin/controle-aulas-admin';
import { AdicionarDicaAdminPage } from '../adicionar-dica-admin/adicionar-dica-admin';
import { AdicionarInstrutorAdminPage } from '../adicionar-instrutor-admin/adicionar-instrutor-admin';
import { ListarUsuarioAdminPage } from '../listar-usuario-admin/listar-usuario-admin';
import { HomePage } from '../home/home';
import { ListarSolicitacaoDeAulaAdminPage } from '../listar-solicitacao-de-aula-admin/listar-solicitacao-de-aula-admin';
import { AgendamentoAdminPage } from '../agendamento-admin/agendamento-admin';

@IonicPage()
@Component({
  selector: 'page-administracao',
  templateUrl: 'administracao.html',
})
export class AdministracaoPage {

  id: any;
  nome: any;

  dadosAula: any;
  dataAula: any;
  horaAula: any;

  notificacaoCompra: any;
  notificacaoAgendamento: any;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams ) {
       this.id = this.navParams.get('id');
       this.nome = this.navParams.get('nome');

       this.http.get('https://api.smartdogtraining.com.br/instrutor/home/index.php?instrutor='+ this.id).toPromise().then((response)=>{
         this.dadosAula = response.json();
         this.dataAula = this.dadosAula[0].data;
         this.horaAula = this.dadosAula[0].hora;
       }).catch((response)=>{
         console.log('erro na requisicao0');
       });
  }

  ionViewDidLoad() {

    this.http.get('https://api.smartdogtraining.com.br/administracao/solicitacaoCompra/solicitacao.php').toPromise().then((response)=>{
      this.notificacaoCompra = response.json();
    }).catch((response)=>{
      console.log('erro na requisicao1');
    });

    this.http.get('https://api.smartdogtraining.com.br/administracao/solicitacaoAgendamento/index.php').toPromise().then((response)=>{
      this.notificacaoAgendamento = response.json();
    }).catch((response)=>{
      console.log('erro na requisicao2');
    });

  }

  verAgenda(){
    this.navCtrl.push(AgendaInstrutorPage);
  }

  agenda_instrutor(){
    this.navCtrl.push(AgendaInstrutorPage);
  }

  controle_aulas(){
    this.navCtrl.push(ControleAulasAdminPage);
  }

  adicionar_dica(){
    this.navCtrl.push(AdicionarDicaAdminPage,{
      id:this.id,
      nome: this.nome
    });
  }

  adicionar_instrutor(){
    this.navCtrl.push(AdicionarInstrutorAdminPage,{
      id: this.id,
      nome: this.nome
    });
  }

  listar_usuarios(){
    this.navCtrl.push(ListarUsuarioAdminPage);
  }

  solicitacaoAgendamento(){
    this.navCtrl.push(AgendamentoAdminPage,{
      id: this.id,
      nome: this.nome});
  }

  solicitacaoCompraAula(){
    this.navCtrl.push(ListarSolicitacaoDeAulaAdminPage,{
      id: this.id,
      nome: this.nome});
  }

  sair(){
    this.navCtrl.push(HomePage)
  }

}
