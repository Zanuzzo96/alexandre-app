import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentoUserPage } from './agendamento-user';

@NgModule({
  declarations: [
    //AgendamentoUserPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendamentoUserPage),
  ],
})
export class AgendamentoUserPageModule {}
