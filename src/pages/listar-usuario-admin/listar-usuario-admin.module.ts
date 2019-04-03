import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarUsuarioAdminPage } from './listar-usuario-admin';

@NgModule({
  declarations: [
    //ListarUsuarioAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarUsuarioAdminPage),
  ],
})
export class ListarUsuarioAdminPageModule {}
