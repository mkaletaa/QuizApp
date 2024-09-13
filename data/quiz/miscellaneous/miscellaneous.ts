import destructuring from './destructuring.json';
import execution_context from './execution_context.json';
import spread_and_rest from './spread_and_rest.json';


export const miscellaneous = {
  execution_context,
  spread_and_rest,
  destructuring,
}

type ConditionalType<T> = T extends string ? string : number;

function f<T>(entity: T): ConditionalType<T> {
  if (typeof entity === 'string') {
    return entity as ConditionalType<T>;
  }
  return 42 as ConditionalType<T>;
}