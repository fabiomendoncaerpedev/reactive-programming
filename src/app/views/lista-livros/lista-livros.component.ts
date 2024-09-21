import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, switchMap, tap, throwError, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LivroService } from './../../services/livro.service';
import { Item, Livro, LivrosResultados } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
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

          return EMPTY;
        }
      )
    )

  parseLivrosResultadosParaLivros(items: Array<Item>): Array<LivroVolumeInfo> {
    return items.map((item) => new LivroVolumeInfo(item));
  }

}



