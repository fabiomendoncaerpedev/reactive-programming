import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { LivroComponent } from './componentes/livro/livro.component';
import { ListaLivrosComponent } from './views/lista-livros/lista-livros.component';
import { ModalLivroComponent } from './views/modal-livro/modal-livro.component';
import { LivroService } from './services/livro.service';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    LivroComponent,
    ListaLivrosComponent,
    ModalLivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    LivroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
