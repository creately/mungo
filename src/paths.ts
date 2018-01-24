import { getType, DataType } from './types';

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
export function split(str: string): Path | null {
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
  for (let i = 0, l = path.length; i < l; ++i) {
    if (parent === undefined) {
      break;
    }
    const segment = path[i];
    if (typeof segment === 'string') {
      if (getType(parent) !== DataType.object) {
        return false;
      }
    } else if (typeof segment === 'number') {
      if (getType(parent) !== DataType.array) {
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
    } else {
      throw new Error('Unexpected path segment');
    }
    parent = parent[parentSegment];
  }
}

// get
// get gets the value on given path (if it exists)
export function get(doc: any, path: Path): any {
  let current = doc;
  for (let i = 0, l = path.length; i < l; ++i) {
    if (current === undefined) {
      return undefined;
    }
    const segment = path[i];
    current = current[segment];
  }
  return current;
}

// set
// set sets the given value on given path on the document
export function set(doc: any, path: Path, val: any): void {
  const parentValue = get(doc, parent(path));
  const lastSegment = path[path.length - 1];
  parentValue[lastSegment] = val;
}

//unset
// delets the given field from the document
export function unset( doc: any, path: Path ): void {
  const parentValue = get(doc, parent(path));
  const lastSegment = path[path.length - 1];
  delete parentValue[lastSegment];
}

// parent
// parent returns the path without the last path segment.
export function parent(path: Path) {
  return path.slice(0, path.length - 1);
}
