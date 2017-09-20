// PathSegment
// PathSegment ...
export type PathSegment = string | number;

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
    // https://regex101.com/r/Za3mjz/1
    const SPLIT_REGEX = /\.?(\w+)|\[['"]([^'"]+)['"]\]/gi;
    const segments = [];
    while (true) {
        const results = SPLIT_REGEX.exec(str);
        if (!results) {
            break;
        }
        for (let i = 1, l = results.length; i < l; ++i) {
            const matchStr = results[i];
            if (matchStr) {
                const matchNum = +matchStr;
                const match = Number.isNaN(matchNum) ? matchStr : matchNum;
                segments.push(match);
                break;
            }
        }
    }
    return segments;
}

// check
// check ...
export function check(doc: any, segments: PathSegment[]): boolean {
    if (!Array.isArray(segments)) {
        return false;
    }
    let parent = doc;
    for (let i = 0, l = segments.length; i<l; ++i) {
        if (parent === undefined) {
            break;
        }
        const segment = segments[i];
        if (typeof segment === 'string') {
            if (typeof parent !== 'object' || parent === null || Array.isArray(parent)) {
                return false;
            }
        } else if (typeof segment === 'number') {
            if (!Array.isArray(parent)) {
                return false;
            }
        } else {
            return false;
        }
        parent = parent[segment];
    }
    return true;
}