// PathSegment
// PathSegment is a path segment
export type PathSegment = string | number;

// Path
// Path is an array of path segments
export type Path = PathSegment[];

// split
// split breaks down a path string to segments. Each segment can be
// either a string or an integer. If it is a string, it indicates that
// an object property is being accessed, if it's an integer,
// TODO improve identifying inalid paths
// TODO improve identifying quoted paths
export function split(str: string): PathSegment[] | null {
    if (typeof str !== 'string') {
        return null;
    }
    // regex examples: https://regex101.com/r/Za3mjz/2
    const SPLIT_REGEX = /\.?(\w+)|\[['"]([^'"]+)['"]\]/gi;
    const path = [];
    while (true) {
        const matches = SPLIT_REGEX.exec(str);
        if (!matches) {
            break;
        }
        for (let i = 1, l = matches.length; i < l; ++i) {
            const matchStr = matches[i];
            if (matchStr) {
                const matchNum = +matchStr;
                const segment = Number.isNaN(matchNum) ? matchStr : matchNum;
                path.push(segment);
                break;
            }
        }
    }
    return path;
}

// check
// check checks whether the path can exist on the document.
export function check(doc: any, path: Path): boolean {
    if (!Array.isArray(path)) {
        return false;
    }
    let parent = doc;
    for (let i = 0, l = path.length; i<l; ++i) {
        if (parent === undefined) {
            break;
        }
        const segment = path[i];
        if (typeof segment === 'string') {
            if (!isObject(parent)) {
                return false;
            }
        } else if (typeof segment === 'number') {
            if (!isArray(parent)) {
                return false;
            }
        } else {
            return false;
        }
        parent = parent[segment];
    }
    return true;
}

// makep
// makep ensures the path exists on the document, creates if needed.
// Always run the check function before runnign this function
export function makep(doc: any, path: Path): void {
    let parent = doc;
    for (let i = 1, l = path.length; i < l; ++i) {
        const parentSegment = path[i - 1];
        const currentSegment = path[i];
        if (typeof currentSegment === 'string') {
            if (!parent[parentSegment]) {
                parent[parentSegment] = {};
            }
        } else if (typeof currentSegment === 'number') {
            if (!parent[parentSegment]) {
                parent[parentSegment] = [];
            }
        }
        parent = parent[parentSegment];
    }
}

// isObject
// isObject checks whether the input is an object
export function isObject(val: any) {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
}

// isArray
// isArray checks whether the input is an array
export function isArray(val: any) {
    return Array.isArray(val);
}