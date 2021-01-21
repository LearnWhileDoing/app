import store from "@util/store";
import { ReactiveBuilder } from "@components/molecules/builders";
import React from "react";
import { PuffLoader } from "@components/atoms";

const _LoadingView = (
  <div className="flex flex-col justify-center items-center h-36 w-full">
    <PuffLoader color={"#3b82f6"} size={24} />
  </div>
);

const _NoCourses = (
  <div className={"w-full p-3 flex items-center justify-center"}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={"w-8 text-blue-900"}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
        clipRule="evenodd"
      />
    </svg>
    <p className={"ml-3 text-blue-900"}>You have no current courses</p>
  </div>
);

export const CurrentCourses = () => {
  return (
    <div className={`p-8 sm:p-12 w-full`}>
      <p className={`m-0 mb-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}>CURRENT COURSES</p>
      {store.userData$.value ? (
        <ReactiveBuilder
          subject={store.userData$.value.current}
          builder={({ hasData, data }) => {
            if (hasData && Object.keys(data).length > 0) {
              return (
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridAutoRows: "1fr",
                    gridGap: "1rem",
                    gap: "1rem",
                  }}
                />
              );
            } else return _NoCourses;
          }}
        />
      ) : (
        _NoCourses
      )}
    </div>
  );
};
