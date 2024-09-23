import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from './../../services/livro.service';
import { listBookTrigger } from 'src/app/animations';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  animations: [listBookTrigger]
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';
  livro: Livro;
  qtdLivros = 0;

  constructor(
    private livroService: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter(
        (valorDigitado) => valorDigitado.length >= 3
      ),
      distinctUntilChanged(),
      tap(
        () => console.log('initial stream')
      ),
      switchMap(
        (valorDigitado) => this.livroService.buscar(valorDigitado)
      ),
      tap(
        (retornoAPI) => console.log('request to server', retornoAPI)
      ),
      map(response => {
        this.qtdLivros = response.totalItems;

        return response.items ?? [];
      }),
      map(
        items => this.parseLivrosResultadosParaLivros(items)
      ),
      catchError(
        (erro) => {
          this.mensagemErro = 'Ops ocorreu um erro. Recarregue a aplicação'

          return throwError(
            () => console.log(erro)
          );
        }
      )
    )

  parseLivrosResultadosParaLivros(items: Array<Item>): Array<LivroVolumeInfo> {

    console.log('valor antes de parsear', items);

    const ret = items.map((item) => {
      console.log('valor durante o parser', item)

      return new LivroVolumeInfo(item);
    })

    console.log('valor parseado', ret);

    return ret;
  }

}
