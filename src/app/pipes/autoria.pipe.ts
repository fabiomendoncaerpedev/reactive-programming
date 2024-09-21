import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Autoria' })
export class AutoriaPipe implements PipeTransform {

  transform(autoria: Array<string>): string {
    return autoria
      ? autoria[0]
      : '';
  }

}
