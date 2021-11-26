import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from '../../bd.service';
import * as firebase from 'firebase';
import { ProgressoService } from 'src/app/progresso.service';
import { interval, Subject } from 'rxjs';
import { takeUntil, take }  from 'rxjs/operators'


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: any;
  public imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: any;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bdService: BdService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) =>  {
      this.email = user?.email
    })
  }

  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let acompanhamentoUpload = interval(1500)

    //let continua = new Subject<boolean>()
    //continua.next(true)

    acompanhamentoUpload.pipe(
      take(7))
      .subscribe(() => {
        //console.log(this.progressoService.status),
        //console.log(this.progressoService.estado),
        this.progressoPublicacao = 'andamento',

        this.porcentagemUpload = Math.round(( this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes ) * 100);

      },
        (error: any) => console.log(error),
        () => this.progressoPublicacao = 'concluido'
      )
      
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }
}
