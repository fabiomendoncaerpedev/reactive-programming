import { Component, Input } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent {

  @Input() livro: LivroVolumeInfo;
  modalAberto: boolean;

  onModelChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
