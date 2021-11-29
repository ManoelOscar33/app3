import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(publicacao: any): void {

    console.log(publicacao)

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({titulo: publicacao.titulo})
      .then((resposta: any) => {
        let nomeImagem = resposta.key

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
              this.progressoService.status = 'andamento',
              this.progressoService.estado = snapshot
              //console.log('Snapshot capturado no on()', snapshot)
            }, 
            (error) => {
              this.progressoService.status = 'erro'
              //console.log(error)
            },
            () =>  {
              this.progressoService.status = 'concluído'
              //console.log('Upload completo')
            }
          )
          })

    //console.log('Chegamos até o serviço responsável pelo controle de dados.')
  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {
      //consultar as publicacoes no database
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          //console.log(snapshot.val())

          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {

            let publicacao = childSnapshot.val();
            publicacao.key = childSnapshot.key;

            publicacoes.push(publicacao)
          })

          //resolve(publicacoes)

          return publicacoes.reverse();
        }) 
        .then((publicacoes: any) => {
          //consultar a url da imagem

          publicacoes.forEach((publicacao: any) => {

            firebase.storage().ref()
            .child(`imagens/${publicacao.key}`)
            .getDownloadURL()
            .then((url: string) => {

              publicacao.url_imagem = url

              //consultar o nome do usuário
              firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                .once('value')
                .then((snapshot: any) => {
                  
                  publicacao.nome_usuario = snapshot.val().nome_usuario

                })

            })
          });

          resolve(publicacoes)
          
        })
    })

  }
  
}


/*
  let publicacao = childSnapshot.val();

  //consultar a url da imagem
  firebase.storage().ref()
    .child(`imagens/${childSnapshot.key}`)
    .getDownloadURL()
    .then((url: string) => {
      publicacao.url_imagem = url

      //consultar o nome do usuário
      firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
        .once('value')
        .then((snapshot: any) => {
          
          publicacao.nome_usuario = snapshot.val().nome_usuario

          publicacoes.push(publicacao)
        })

    })
*/