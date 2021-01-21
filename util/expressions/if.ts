interface IfChain<TSuccess, TFailure> {
  (): TSuccess | TFailure;
  then<T>(expr: T, ...fn: Function[]): IfChain<T, TFailure>;
  else<T>(expr: T, ...fn: Function[]): IfChain<TSuccess, T>;
}

export function If(target: any) {
  let thenVal: [any, Function[]] = [undefined, []];
  let elseVal: [any, Function[]] = [undefined, []];

  const chain: IfChain<undefined, undefined> = () => {
    if (target) {
      thenVal[1].forEach((fn) => fn());
      return thenVal[0];
    }
    elseVal[1].forEach((fn) => fn());
    return elseVal[0];
  };
  chain.then = <T>(expr: T, ...fn: Function[]) => {
    thenVal = [expr, fn];
    return chain;
  };
  chain.else = <T>(expr: T, ...fn: Function[]) => {
    elseVal = [expr, fn];
    return chain;
  };
  return chain;
}
