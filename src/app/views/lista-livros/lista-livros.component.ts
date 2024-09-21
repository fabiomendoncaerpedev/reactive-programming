import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LivroService } from './../../services/livro.service';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  livro: Livro;

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
      map(
        items => this.parseLivrosResultadosParaLivros(items)
      )
    )

  constructor(
    private livroService: LivroService
  ) { }

  parseLivrosResultadosParaLivros(items: Array<Item>): Array<LivroVolumeInfo> {
    return items.map((item) => new LivroVolumeInfo(item));
  }

}



