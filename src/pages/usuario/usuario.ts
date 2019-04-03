import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// pagina da navegação
import { AgendarAulaPage } from '../agendar-aula/agendar-aula';
import { ListarAulasPage } from '../listar-aulas/listar-aulas';
import { PlanosPage } from '../planos/planos';
import { DicasUteisPage } from '../dicas-uteis/dicas-uteis';
import { ReagendarAulaPage } from '../reagendar-aula/reagendar-aula';
import { PerfilUsuarioPage } from '../perfil-usuario/perfil-usuario';
import { HomePage } from '../home/home';
import { ListarSolicitacaoDeAulaUserPage } from '../listar-solicitacao-de-aula-user/listar-solicitacao-de-aula-user';
import { AgendamentoUserPage } from '../agendamento-user/agendamento-user';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  id: any;
  nome : any;
  notificacaoCompra: any;
  notificacaoAgendamento: any;

  dadosAula: any;
  dataAula: any;
  horaAula: any;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams ) {

      this.id = navParams.get('id');
      this.nome = navParams.get('nome');

      this.http.get('https://api.smartdogtraining.com.br/aulas/usuario/index.php?usuario='+ this.id).toPromise().then((response)=>{
        this.dadosAula = response.json();
        this.dataAula = this.dadosAula[0].data;
        this.horaAula = this.dadosAula[0].hora;
        console.log(this.dataAula);
        console.log(this.horaAula);
      }).catch((response)=>{
        console.log('erro na requisicao0');
      });
  }

  ionViewDidLoad() {

    this.http.get('https://api.smartdogtraining.com.br/usuario/home/index.php?usuario='+ this.id).toPromise().then((response)=>{
      this.notificacaoCompra = response.json();
    }).catch((response)=>{
      console.log('erro na requisicao1');
    });

    this.http.get('https://api.smartdogtraining.com.br/usuario/home/solicitacao.php?usuario='+ this.id).toPromise().then((response)=>{
      this.notificacaoAgendamento = response.json();
    }).catch((response)=>{
      console.log('erro na requisicao2');
    });

  }

  agendarAula(){
    this.navCtrl.push(AgendarAulaPage, {
      id: this.id,
      nome: this.nome,
    });
  }

  listarAulas(){
    this.navCtrl.push(ListarAulasPage, {
      id:this.id,
      nome: this.nome
    });
  }

  adquirirAulas(){
    this.navCtrl.push(PlanosPage, {
      id: this.id,
      nome: this.nome
    });
  }

  dicasUteis(){
    this.navCtrl.push(DicasUteisPage);
  }

  perfilUsuario(){
    this.navCtrl.push(PerfilUsuarioPage, {
      id: this.id,
      nome: this.nome
    });
  }

  ReagendarAula(){
    this.navCtrl.push(ReagendarAulaPage)
  }

  solicitarAulas(){
    this.navCtrl.push(ListarSolicitacaoDeAulaUserPage,{
      id: this.id,
      nome: this.nome
    })
  }

  solicitarAgendamento(){
    this.navCtrl.push(AgendamentoUserPage, {
      id:this.id,
      nome: this.nome
    });
  }

  sair(){
    this.navCtrl.push(HomePage)
  }

}
