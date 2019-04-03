import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DicasProvider {

  constructor(public http: Http) {

  }

  listar(){
    return this.http.get('https://api.smartdogtraining.com.br/dicas/');
  }

  listarDicas(){
    let dominio = "https://api.smartdogtraining.com.br/dicas/";

    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get(dominio,{headers : headers}).toPromise();
  }

}
