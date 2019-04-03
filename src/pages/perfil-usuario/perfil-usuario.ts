import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UsuarioPage } from '../usuario/usuario';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AdicionarAnimalModalPage } from '../adicionar-animal-modal/adicionar-animal-modal';


@IonicPage()
@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {
  id : number;
  nome : any;
  perfil : string = "usuario";
  dadosPerfil : any;
  dadosAnimal : any;

  usuario = { id_user:'', nome:'', cpf:'', rg:'', nasc:'', contato:'', endereco:'', acao: "atualizarUsuario", login:'', senha:''  };

  animal : any;

  animalUpdate = { id:'', id_user:'', nomeAnimal: '', raca:'', sexo:'', idade:'', castrado:'', acao: "atualizarAnimal"  };

  constructor( public modalCtrl: ModalController ,public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController  ) {

      this.id = this.navParams.get('id');
      this.nome = this.navParams.get('nome');
      this.animalUpdate.id_user = this.navParams.get('id');

      let loading = this.loadingCtrl.create({
        content : 'Carregando dados do perfil',
      });
      loading.present();

      this.http.get('https://api.smartdogtraining.com.br/usuario/perfilUsuario/index.php?usuario='+ this.id).toPromise().then((response)=>{
        this.dadosPerfil = response.json();
        console.log(this.dadosPerfil);

        this.usuario.id_user = this.dadosPerfil[0].id;
        this.usuario.nome = this.dadosPerfil[0].nome;
        this.usuario.cpf = this.dadosPerfil[0].cpf;
        this.usuario.rg = this.dadosPerfil[0].rg;
        this.usuario.nasc = this.dadosPerfil[0].nascimento;
        this.usuario.contato = this.dadosPerfil[0].contato;
        this.usuario.endereco = this.dadosPerfil[0].endereco;
        this.usuario.endereco = this.dadosPerfil[0].endereco;
        this.usuario.endereco = this.dadosPerfil[0].endereco;
        this.usuario.login = this.dadosPerfil[0].login;
        this.usuario.senha = this.dadosPerfil[0].senha;


      }).catch((response)=>{
        console.log('erro na requisicao');
      });

      this.http.get('https://api.smartdogtraining.com.br/usuario/perfilAnimal/index.php?usuario='+ this.id).toPromise().then((response)=>{
        this.dadosAnimal = response.json();
        loading.dismiss();
      }).catch((response)=>{
        console.log('erro na requisicao');
      });

  }

  ionViewDidLoad() {

  }

  atualizarUsuario(){
    console.log(this.usuario);

    let loadingAtualizacaoUsuario = this.loadingCtrl.create({
      content : 'Atualizando dados do usuário',
    })

    let alertSucesso = this.alertCtrl.create({
      title : "<h2 text-center>Sucesso</h2>",
      subTitle : "Dados do usuário atualizados com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(UsuarioPage,{
            id: this.id,
            nome: this.usuario.nome
          });
        }
      }]
    });

    let alertErro = this.alertCtrl.create({
      title : "<h2 text-center>Erro</h2>",
      subTitle : "Ocorreu um erro na hora de atualizar os dados, tente novamente",
      buttons : [{
        text: "OK",
      }]
    });

    loadingAtualizacaoUsuario.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/usuario/perfilUsuario/',
      this.usuario,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loadingAtualizacaoUsuario.dismiss();
          alertSucesso.present();
        },
        err => {
          loadingAtualizacaoUsuario.dismiss();
          alertErro.present();
        }
      );
  }



  atualizarAnimal(id : any, nomeAnimal : any,  raca:any,sexo:any,idade:any, castrado: any){
    this.animalUpdate.id = id;
    this.animalUpdate.nomeAnimal = nomeAnimal;
    this.animalUpdate.raca = raca;
    this.animalUpdate.sexo = sexo;
    this.animalUpdate.idade = idade;
    this.animalUpdate.castrado = castrado;

    let loadingAtualizacaoAnimal = this.loadingCtrl.create({
      content : 'Atualizando dados do animal',
    })

    let alertSucesso = this.alertCtrl.create({
      title : "<h2 text-center>Sucesso</h2>",
      subTitle : "Dados do animal atualizados com sucesso",
      buttons : [{
        text: "OK",
        handler : ()=>{
          this.navCtrl.push(UsuarioPage,{
            id: this.id,
            nome: this.nome
          });
        }
      }]
    });

    let alertErro = this.alertCtrl.create({
      title : "<h2 text-center>Erro</h2>",
      subTitle : "Ocorreu um erro na hora de atualizar os dados, tente novamente",
      buttons : [{
        text: "OK"
      }]
    });

    loadingAtualizacaoAnimal.present();

    let headers: Headers = new Headers();
    headers.append('Content-type','application/json');

    this.http.post(
      'https://api.smartdogtraining.com.br/usuario/perfilUsuario/',
      this.animalUpdate,
      new RequestOptions({ headers: headers })
    ).subscribe(
        res => {
          loadingAtualizacaoAnimal.dismiss();
          alertSucesso.present();
        },
        err => {
          loadingAtualizacaoAnimal.dismiss();
          alertErro.present();
        }
      );
  }




  adicionarAnimal(){
      this.modalCtrl.create(AdicionarAnimalModalPage,{
        id: this.id,
        nome: this.nome
      }).present();
  }

}
