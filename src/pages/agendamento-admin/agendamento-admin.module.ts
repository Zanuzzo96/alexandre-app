import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentoAdminPage } from './agendamento-admin';

@NgModule({
  declarations: [
    //AgendamentoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendamentoAdminPage),
  ],
})
export class AgendamentoAdminPageModule {}
