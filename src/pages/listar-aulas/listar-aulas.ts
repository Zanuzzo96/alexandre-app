import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'rxjs/add/operator/toPromise';

import { AgendarAulaPage } from '../agendar-aula/agendar-aula';
import { DetalheAulaUsuarioPage } from '../detalhe-aula-usuario/detalhe-aula-usuario';


@IonicPage()
@Component({
  selector: 'page-listar-aulas',
  templateUrl: 'listar-aulas.html',
})
export class ListarAulasPage {

  opcoes : string = "concluida";
  aulasPendentes: any;
  aulasConcluidas: any;
  quantidade: any;
  id: any;
  nome : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController) {

      this.id = this.navParams.get('id');
      this.nome = this.navParams.get('nome');
  }

  ionViewDidLoad() {

    let id = this.navParams.get('id');

    let loading = this.loadingCtrl.create({
      content : 'Carregando Aulas ',
    });

    loading.present();

    //pegar oo numero de aula pendentes para ver se pode ser agendada aulas ou tem que solicitar mais aulas
          this.http.get('https://api.smartdogtraining.com.br/aulas/pendenteUsuario/index.php?usuario='+ id).toPromise().then((response)=>{
              this.aulasPendentes = response.json();
              this.quantidade = this.aulasPendentes[0].quantidade;
          }).catch((response)=>{
              console.log('erro na requisicao');
              loading.dismiss();
          });

          //pegar oo numero de aula pendentes para ver se pode ser agendada aulas ou tem que solicitar mais aulas
               this.http.get('https://api.smartdogtraining.com.br/aulas/pendenteUsuario/aulas.php?usuario='+ id).toPromise().then((response)=>{
                    this.aulasConcluidas = response.json();
                    loading.dismiss();
                    console.log(response.json());
                }).catch((response)=>{
                    console.log('erro na requisicao');
                    loading.dismiss();
                });
  }

  agendarAulaPendente(){
    this.navCtrl.push(AgendarAulaPage, {
      id: this.id,
      nome: this.nome
    });
  }

  solicitarMaisAulas(){
    this.navCtrl.push(AgendarAulaPage, {
      id: this.id,
      nome: this.nome
    });
  }

  detalheAula(id:string,data:string,hora:string,nomeAnimal:string,status:string,conteudo_aula:string,nome_user:string,id_user: string){
    console.log(id);
    console.log(data);
    console.log(hora);
    console.log(nomeAnimal);
    console.log(status);
    console.log(conteudo_aula);
    console.log(nome_user);
    console.log(id_user);

    this.navCtrl.push(DetalheAulaUsuarioPage,{
      id_aula: id,
      data: data,
      hora: hora,
      animal: nomeAnimal,
      status: status,
      conteudo: conteudo_aula,
      nome_user: nome_user,
      id_user: id_user
    });
  }

}
