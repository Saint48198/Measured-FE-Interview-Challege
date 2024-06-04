import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'camelCaseToWords'
})
export class CamelCaseToWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    console.log('value:', value)
    // Regular expression to detect camelCase words ending with Roman numerals
    const romanNumeralRegex = /^(.*?)(I|II|III|IV|V|VI|VII|VIII|IX|X|LT)+$/;

    const match = value.match(romanNumeralRegex);

    let words = value;
    let romanNumeral = '';

    if (match) {
      words = match[1]; // The initial part of the string
      romanNumeral = match[2]; // The Roman numeral at the end
    }

    // Transform camelCase to space-separated words
    words = words.replace(/([A-Z])/g, ' $1').trim();

    // If there's a Roman numeral, format it inside brackets
    if (romanNumeral) {
      return `${words}(${romanNumeral})`;
    } else {
      return words;
    }
  }
}
