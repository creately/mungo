// DataType
// DataType ...
export enum DataType {
    any,
    array,
    object,
    number,
    string,
    boolean,
}

// getType
// getType ...
export function getType(val: any) {
    if (Array.isArray(val)) {
        return DataType.array;
    }
    if (typeof val === 'object' && val !== null) {
        return DataType.object;
    }
    if (typeof val === 'number') {
        return DataType.number;
    }
    if (typeof val === 'string') {
        return DataType.string;
    }
    if (typeof val === 'boolean') {
        return DataType.boolean;
    }
    return null;
}

// getZero
// getZero ...
export function getZero(type: DataType): any {
    if(type === DataType.array) {
        return [];
    }
    if(type === DataType.object) {
        return {};
    }
    if(type === DataType.number) {
        return 0;
    }
    if(type === DataType.string) {
        return '';
    }
    if(type === DataType.boolean) {
        return false;
    }
    return null;
}