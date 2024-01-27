import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cm',
    standalone: true
})
export class CmPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): string {
        const newValue = `${value} cm`
        return newValue
    }

}
