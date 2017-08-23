import mingo from 'mingo';

// UpdateOperator
// UpdateOperator functions modifies a document in place
export type UpdateOperator = (doc: any, op: any) => void;

// OPERATORS
export const OPERATORS: { [key: string]: UpdateOperator } = {};

// $set
OPERATORS.$set = (doc: any, op: any) => {
  Object.assign(doc, op);
};

// $push
OPERATORS.$push = (doc: any, op: any) => {
  Object.keys(op).forEach(key => {
    const val = op[key];
    if (!doc[key] || !Array.isArray(doc[key])) {
      doc[key] = [val];
    } else {
      doc[key].push(val);
    }
  });
};

// $pull
OPERATORS.$pull = (doc: any, op: any) => {
  Object.keys(op).forEach(key => {
    const val = op[key];
    const docVal = doc[key];
    if (!docVal || !Array.isArray(docVal)) {
      return;
    }
    if (val && val.$elemMatch) {
      const selector = val.$elemMatch;
      const mq = new mingo.Query(selector);
      const matches = mq.find(docVal).all();
      doc[key] = docVal.filter(elem => matches.indexOf(elem) === -1);
    } else {
      doc[key] = docVal.filter(elem => elem !== val);
    }
  });
};
