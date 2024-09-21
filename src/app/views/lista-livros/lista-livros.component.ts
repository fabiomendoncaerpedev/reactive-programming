import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from './../../services/livro.service';
import { Item, Livro } from 'src/app/models/interfaces';

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

  parseLivrosResultadosParaLivros(items: Array<Item>): Array<Livro> {
    const livros: Array<Livro> = [];

    items.forEach(item => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
      })
    });

    return livros;
  }

}



