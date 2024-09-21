import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from './../../services/livro.service';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Array<Livro>;
  campoBusca = '';
  subscription: Subscription;
  livro: Livro;

  constructor(
    private livroService: LivroService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.listaLivros = this.parseLivrosResultadosParaLivros(items);
      },
      error: (error) => console.log(error)
    });
  }

  parseLivrosResultadosParaLivros(items: Array<Item>): Array<LivroVolumeInfo> {
    return items.map((item) => new LivroVolumeInfo(item));
  }

}



