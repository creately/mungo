// FIXME: installing @types/node conflicts with jest. find a good solution
//        and install @types/mongodb which depends on @types/node
declare var process: any;

declare module 'mongodb' {
    const MongoClient: any;
}
