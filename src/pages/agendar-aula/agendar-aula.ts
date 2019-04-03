import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'rxjs/add/operator/toPromise';
import { PlanosPage } from '../planos/planos';
import { UsuarioPage } from '../usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-agendar-aula',
  templateUrl: 'agendar-aula.html',
})
export class AgendarAulaPage {

  id:any;
  nome: any;
  id_usuario : any;
  animal : any;
  aulasPendentes: any;
  quantidade: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController  ) {
      this.id = this.navParams.get('id');
      this.nome = this.navParams.get('nome');
      console.log(this.id);
      console.log(this.nome)
    }

ionViewDidLoad() {

  let id = this.navParams.get('id');

  let loading2 = this.loadingCtrl.create({
    content : 'Preparando agenda',
  });

    loading2.present()
  //pegar oo numero de aula pendentes para ver se pode ser agendada aulas ou tem que solicitar mais aulas
        this.http.get('https://api.smartdogtraining.com.br/aulas/pendenteUsuario/index.php?usuario='+ id).toPromise().then((response)=>{
          this.aulasPendentes = response.json();
          console.log(this.aulasPendentes);
          this.quantidade = this.aulasPendentes[0].quantidade;

        }).catch((response)=>{
          console.log('erro na requisicao 1');
        });

        this.http.get('https://api.smartdogtraining.com.br/animal/index.php?usuario='+ id).toPromise().then((response)=>{
          this.animal = response.json();
          console.log(this.animal);
        }).catch((response)=>{
          console.log('erro na requisicao 2');
        });
    loading2.dismiss();
}

  agendamento = { "dia":"","hora":"","animal":"", "id_user":""};

  solicitarAgendamento(){

    this.agendamento.id_user = this.navParams.get('id');
    let id = this.navParams.get('id');
    let nome = this.navParams.get('nome');
    console.log(nome);

    console.log(this.agendamento);

    let loading = this.loadingCtrl.create({
      content : 'Fazendo Solicitação de agendamento de aula',
    });

    let alert = this.alertCtrl.create({
      title : "Sucesso",
      subTitle : "Aula solicitada com sucesso, Aguarde a confirmação de agendamento",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(UsuarioPage, {
            id : id,
            nome: nome
          });
        }
      }]
    });

    let alert2 = this.alertCtrl.create({
      title : "Algo deu errado",
      subTitle : "Solicitação não enviada, tente novamente",
      buttons : [{
        text: "OK",
      }]
    });

    loading.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/aulas/solicitarAgendamento/',
      this.agendamento,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loading.dismiss();
          alert.present();
        },
        err => {
          loading.dismiss();
          alert2.present();
        }
      );
  }

  solicitarAulas(){
    this.navCtrl.push(PlanosPage,{
      id: this.id,
      nome: this.nome
    });
  }
}
