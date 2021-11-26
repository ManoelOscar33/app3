import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BdService } from 'src/app/bd.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: any;
  public publicacoes: any;

  constructor(private bdService: BdService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user?.email

      this.atualizarTimeLine();
    })
  }

  public atualizarTimeLine(): void {
    this.bdService.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
      })
  }
}
