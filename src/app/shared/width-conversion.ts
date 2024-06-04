import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'widthConversion'
})
export class WidthConversionPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '100%';

    const baseValue = 12;
    const percentage = (value / baseValue) * 100;

    if(percentage > 100 || percentage < 0) return '100%';

    return `${percentage}%`;
  }
}
