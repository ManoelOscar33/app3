import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AutenticacaoService {

  token_id: any;

  constructor(
    private router: Router
  ) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    //console.log('Chegamos até o serviço: ', usuario)

    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {


        //Registrando dados do usuario no path email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)
      })
      .catch((error: any) => console.log(error))
  }

  public autenticar(email: any, senha: any): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => { 
        /*
        firebase.auth().currentUser.getIdToken()
        .then((idToken: any) => {
          this.token_id = idToken,
          console.log(this.token_id)
          this.router.navigate(['home'])
        })*/
        
        this.token_id = resposta.refreshToken
        localStorage.setItem('idToken', resposta.refreshToken)
        this.router.navigate(['home'])
      })
      .catch((error: any) => console.log(error))
  }

  public autenticado(): boolean {

    if(this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken')
    }

    if(this.token_id === undefined) {
      this.router.navigate(['/'])
    }

    return this.token_id !== undefined
  }

  public sair(): void {

    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken')
        this.token_id = undefined
        this.router.navigate(['/'])
      })
  }
}
