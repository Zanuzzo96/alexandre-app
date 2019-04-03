import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UsuarioProvider {

  id_usuario : any;

  constructor(public http: Http) {

  }

  listarUsuarios(){
    return this.http.get('https://api.smartdogtraining.com.br/usuario/').toPromise();
  }

  listarInstrutor(){
    return this.http.get('https://api.smartdogtraining.com.br/instrutor/').toPromise();
  }
}
