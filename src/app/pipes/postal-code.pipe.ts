import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'postalCode' })
export class PostalCodePipe implements PipeTransform {
  transform(value: string): string {
    return value ? `${value.slice(0, 3)} ${value.slice(3, 6)}` : null;
  }
}
