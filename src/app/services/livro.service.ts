import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item, LivrosResultados } from './../models/interfaces';

@Injectable()
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    private http: HttpClient
  ) { }

  buscar(valorDigitado: string): Observable<Array<Item>> {
    const params = new HttpParams().append('q', valorDigitado);

    return this.http.get<LivrosResultados>(this.API, { params }).pipe(
      map(response => response.items),
    );
  }

}
