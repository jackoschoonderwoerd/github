





export interface Product {
    // general
    id?: string;
    hidden?: boolean;
    name?: string;
    description?: string;
    imageUrl?: string;
    imageUrls?: string[];
    price?: number;
    // bass
    size?: string;
    model?: string;
    scale?: string;
    typeOfWood?: string;
    origin?: string;
    backboard?: string;
    color?: string;

    yearBuilt?: number;
    bridge?: number;
    mensuur?: number;
    stringLength?: number;
    top?: number;
    middle?: number;
    bottom?: number;
    depth?: number;
    lengthBackPlate?: number;
    // amp
    type?: string;
    output?: number;
    weight?: number;
    material?: number;

}

