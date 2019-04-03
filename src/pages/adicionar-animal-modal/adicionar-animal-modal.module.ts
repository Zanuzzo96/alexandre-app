import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarAnimalModalPage } from './adicionar-animal-modal';

@NgModule({
  declarations: [
    //AdicionarAnimalModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarAnimalModalPage),
  ],
})
export class AdicionarAnimalModalPageModule {}
