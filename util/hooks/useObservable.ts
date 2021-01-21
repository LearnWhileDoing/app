import { Observable } from "rxjs";
import { useEffect } from "react";

export const useObservable = <T>(listener: (data: T) => void, observable: Observable<T>) =>
  useEffect(() => {
    const subscription = observable.subscribe(listener);
    return () => subscription.unsubscribe();
  });
