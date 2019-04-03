import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DicasProvider } from '../../providers/dicas/dicas';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-dicas-uteis',
  templateUrl: 'dicas-uteis.html',
})
export class DicasUteisPage {

  dicas: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private dicasProvider : DicasProvider, public loadingCtrl : LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content : "Carregando dicas",
    });

    loading.present();

    this.dicasProvider.listarDicas().then((response)=>{

      this.dicas = response.json();
      loading.dismiss();

    }).catch((response)=>{
      console.log('erro na requisicao');
    })
  }
/*
  verDicas(){
    this.dicasProvider.listarDicas().then((response)=>{
      console.log(response);
      this.listarDicas = response;
      console.log(this.listarDicas);
    }).catch((response)=>{
      console.log('erro na requisicao');
    })
  }
*/

}
