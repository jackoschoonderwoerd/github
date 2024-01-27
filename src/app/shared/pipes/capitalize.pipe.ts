import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize',
    standalone: true
})
export class CapitalizePipe implements PipeTransform {

    exclude: string[] = [
        'and', 'And'
    ]

    transform(value: string, ...args: unknown[]): string {

        const stringArray: string[] = value.split(' ');

        const newArray: string[] = [];

        stringArray.forEach((originalWord: string) => {
            const index = this.exclude.findIndex((word: string) => {
                return originalWord == word
            })
            if (index == -1) {
                const newWord = this.capitalizeWord(originalWord)
                newArray.push(newWord)
            } else {
                const newWord = this.decapitalizeWord(originalWord)
                newArray.push(newWord)
            }

        })
        const newString = newArray.join(' ');
        return newString
    }

    private capitalizeWord(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    private decapitalizeWord(word: string) {
        return word.charAt(0).toLowerCase() + word.slice(1);
    }

}
