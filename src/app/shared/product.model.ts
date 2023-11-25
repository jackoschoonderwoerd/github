
export interface AmplifierType {
    type: 'combo' | 'top' | 'speaker'
}

export interface Amplification {
    id?: string;
    brand: string;
    type: AmplifierType;
    // watt:number;
    // sold:boolean;
    // price:number;
    // description:string;
}
