import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-listar-usuario-admin',
  templateUrl: 'listar-usuario-admin.html',
})
export class ListarUsuarioAdminPage {

  listaUsuarios : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuarioProvider : UsuarioProvider,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    public actionSheetCtrl : ActionSheetController  ) {
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content : "Listando Usuários",
    });

    loading.present();

    this.usuarioProvider.listarUsuarios().then((response)=>{
      loading.dismiss();

      this.listaUsuarios = response.json();

    }).catch((response)=>{
      console.log('erro na requisicao');
    })
  }

  opcoes(){
    let opcoesInstrutor = this.actionSheetCtrl.create({
      buttons: [
        {
          text : "Agendar aula",
          icon : 'ios-calendar-outline',
          /*handler : ()=>{
            this.navCtrl.push()
          }*/
        },
        {
          text : "Ver perfil do usuário",
          icon : 'ios-person-outline',
          /*handler : ()=>{
            this.navCtrl.push()
          }*/
        },
        {
          text : "Bloquiar / Desbloquiar usuário",
          icon : 'ios-close-outline'

        },
        {
          text : "Cancelar",
          icon : 'ios-exit-outline'
        }
      ]
    });

    opcoesInstrutor.present();

  }

}
