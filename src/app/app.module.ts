import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//Back-end imports
import { HttpModule } from '@angular/http';
import { DicasProvider } from '../providers/dicas/dicas';
import { IonicStorageModule } from '@ionic/storage';
// home e registro de usuario
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrousuarioPage } from '../pages/registrousuario/registrousuario';
// Usuarios
import { UsuarioPage } from '../pages/usuario/usuario';
import { AgendarAulaPage } from '../pages/agendar-aula/agendar-aula';
import { ListarAulasPage } from '../pages/listar-aulas/listar-aulas';
import { DicasUteisPage } from '../pages/dicas-uteis/dicas-uteis';
import { ReagendarAulaPage } from '../pages/reagendar-aula/reagendar-aula';
import { PlanosPage } from '../pages/planos/planos';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { DetalheAulaUsuarioPage } from '../pages/detalhe-aula-usuario/detalhe-aula-usuario';
import { CompraDeAulaUserPage } from '../pages/compra-de-aula-user/compra-de-aula-user';
import { ListarSolicitacaoDeAulaUserPage } from '../pages/listar-solicitacao-de-aula-user/listar-solicitacao-de-aula-user';
import { AgendamentoUserPage } from '../pages/agendamento-user/agendamento-user';
// Instrutor
import { InstrutorPage } from '../pages/instrutor/instrutor';
import { AgendaInstrutorPage } from '../pages/agenda-instrutor/agenda-instrutor';
import { AulasInstrutorPage } from '../pages/aulas-instrutor/aulas-instrutor';
import { NotificacaoInstrutorPage } from '../pages/notificacao-instrutor/notificacao-instrutor';
import { ValidaAulaInstrutorPage } from '../pages/valida-aula-instrutor/valida-aula-instrutor';
import { PerfilInstrutorPage } from '../pages/perfil-instrutor/perfil-instrutor';
// Administrador
import { AdministracaoPage } from '../pages/administracao/administracao';
import { AgendaInstrutorAdminPage } from '../pages/agenda-instrutor-admin/agenda-instrutor-admin';
import { ControleAulasAdminPage } from '../pages/controle-aulas-admin/controle-aulas-admin';
import { AdicionarDicaAdminPage } from '../pages/adicionar-dica-admin/adicionar-dica-admin';
import { AdicionarInstrutorAdminPage } from '../pages/adicionar-instrutor-admin/adicionar-instrutor-admin';
import { ListarUsuarioAdminPage } from '../pages/listar-usuario-admin/listar-usuario-admin';
import { CompraDeAulaAdminPage } from '../pages/compra-de-aula-admin/compra-de-aula-admin';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ListarSolicitacaoDeAulaAdminPage } from '../pages/listar-solicitacao-de-aula-admin/listar-solicitacao-de-aula-admin';
import { PerfilViaAdminPage } from '../pages/perfil-via-admin/perfil-via-admin';
import { AdicionarAnimalModalPage } from '../pages/adicionar-animal-modal/adicionar-animal-modal';
import { AgendamentoAdminPage } from '../pages/agendamento-admin/agendamento-admin';

@NgModule({
  declarations: [
    MyApp, HomePage, RegistrousuarioPage,
    UsuarioPage, AgendarAulaPage, ListarAulasPage,PlanosPage,DicasUteisPage,ReagendarAulaPage, PerfilUsuarioPage,DetalheAulaUsuarioPage,CompraDeAulaUserPage,ListarSolicitacaoDeAulaUserPage,AgendamentoUserPage,
    InstrutorPage, AgendaInstrutorPage, AulasInstrutorPage, NotificacaoInstrutorPage,ValidaAulaInstrutorPage,PerfilInstrutorPage,
    AdministracaoPage,AgendaInstrutorAdminPage,ControleAulasAdminPage,AdicionarDicaAdminPage,AdicionarInstrutorAdminPage,ListarUsuarioAdminPage,CompraDeAulaAdminPage,ListarSolicitacaoDeAulaAdminPage,PerfilViaAdminPage,AdicionarAnimalModalPage,AgendamentoAdminPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, RegistrousuarioPage,
    UsuarioPage, AgendarAulaPage, ListarAulasPage, PlanosPage, DicasUteisPage, ReagendarAulaPage, PerfilUsuarioPage,DetalheAulaUsuarioPage,CompraDeAulaUserPage,ListarSolicitacaoDeAulaUserPage,AgendamentoUserPage,
    InstrutorPage,AgendaInstrutorPage, AulasInstrutorPage, NotificacaoInstrutorPage,ValidaAulaInstrutorPage,PerfilInstrutorPage,
    AdministracaoPage,AgendaInstrutorAdminPage,ControleAulasAdminPage,AdicionarDicaAdminPage,AdicionarInstrutorAdminPage,ListarUsuarioAdminPage,CompraDeAulaAdminPage,ListarSolicitacaoDeAulaAdminPage,PerfilViaAdminPage,AdicionarAnimalModalPage,AgendamentoAdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DicasProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
