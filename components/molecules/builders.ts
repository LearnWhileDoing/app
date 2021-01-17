import React, {useEffect, useState} from "react";
import {Observable, of}             from "rxjs";
import {catchError}                 from "rxjs/operators";

type Builder<T> = ({
                     hasData,
                     hasError,
                     error,
                     data
                   }: { hasData: boolean, hasError: boolean, error: Error, data: T }) => React.ReactElement;


export const PromiseBuilder = <T extends any>({promise, builder}: { promise: Promise<T>, builder: Builder<T> }) => {
    const [data, setData] = useState<T>(undefined);
    const [error, setError] = useState<Error>(undefined);

    useEffect(() => {
      promise.then(setData).catch(setError);
    });

    return React.createElement(
      builder, {
        hasData: data != undefined, data,
        hasError: error != undefined, error
      }
    );
  }
;

export const ReactiveBuilder = <T extends any>({subject, builder}: { subject: Observable<T>, builder: Builder<T> }) => {
    const [data, setData] = useState<T>(undefined);
    const [error, setError] = useState<Error>(undefined);

    useEffect(() => {
      subject.pipe(catchError(v => of(v as Error))).subscribe(v => {
          if (v instanceof Error) return setError(v);
          setData(v);
        }
      );
    });

    return React.createElement(
      builder, {
        hasData: data != undefined, data,
        hasError: error != undefined, error
      }
    );
  }
;
