import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import React, { useState } from "react";
import { Button, KnowledgePoints, PuffLoader } from "@components/atoms";
import { ReactiveBuilder } from "@components/molecules";
import store, { useShowWaiting } from "@util/store";
import { useObservable } from "@util/hooks/useObservable";

const _Wrapper = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.background({
      color: "white",
    }),
    style.effects({
      boxShadow: theme.boxShadow.lg,
    }),
    style.border({
      radius: theme.borderRadius.md,
    }),
    style.spacing({
      paddingY: theme.spacing["6"],
      paddingX: theme.spacing["8"],
    }),
    {
      [`@media(max-width: calc(60rem + ${theme.spacing["8"]}))`]: {
        boxShadow: theme.boxShadow.sm,
        borderRadius: 0,
      },
      [`@media(max-width: ${theme.breakpoint.md})`]: {
        flexDirection: "column",
      },
    }
  )
);

const _Left = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.sizing({
      width: "100%",
    }),
    style.spacing({
      paddingY: theme.spacing["10"],
      paddingLeft: theme.spacing["2"],
      paddingRight: theme.spacing["6"],
    }),
    style.flexbox({
      grow: 1,
    }),
    style.boxAlignment({
      alignItems: "center",
    }),
    style.border({
      style: "solid",
      widthRight: 1,
      color: theme.color.grey["200"],
    }),
    {
      [`@media(max-width: ${theme.breakpoint.md})`]: style.merge(
        style.spacing({
          paddingX: 0,
          paddingTop: theme.spacing["4"],
          paddingBottom: theme.spacing["6"],
        }),
        style.border({
          widthRight: 0,
          widthBottom: 1,
        })
      ),
    }
  )
);

const _Right = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.sizing({
      width: "100%",
    }),
    style.spacing({
      paddingY: theme.spacing["10"],
      paddingLeft: theme.spacing["6"],
      paddingRight: 0,
    }),
    style.flexbox({
      grow: 1,
    }),
    style.boxAlignment({
      placeContent: "center",
      placeItems: "center",
    }),
    {
      [`@media(max-width: ${theme.breakpoint.md})`]: style.merge(
        style.spacing({
          padding: 0,
          paddingTop: theme.spacing["6"],
        })
      ),
    }
  )
);

const _Unauthed = () => {
  const [, setShowWaiting] = useShowWaiting();

  const handleLogin = async () => {
    setShowWaiting(true);
    try {
      await store.auth.signIn();
    } catch (e) {}
    setShowWaiting(false);
  };

  return (
    <>
      <_Left>
        <div
          css={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            css={{
              display: "inline-block",
              fontSize: theme.typography.size["3xl"],
              fontWeight: theme.typography.weight.normal,
              textAlign: "center",
              [`@media(max-width:${theme.breakpoint.md})`]: {
                fontSize: theme.typography.size["2xl"],
              },
            }}
          >
            Welcome to <span css={{ fontWeight: theme.typography.weight.semibold }}>LearnWhileDoing!</span>
          </h1>
          <br />
          <div
            css={{
              display: "inline-block",
              width: "100%",
            }}
          >
            <Button
              onClick={() => handleLogin()}
              value={"Sign-in with Google"}
              color={"red"}
              leading={({ className }) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={className}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              )}
            />
          </div>
        </div>
      </_Left>
      <_Right>
        <p>
          You'll need an account to start courses and track your progress. Once you begin to collect knowledge points,
          you can let people know!
        </p>
      </_Right>
    </>
  );
};

const _Authed = () => {
  const [name, setName] = useState(" ");
  const [points, setPoints] = useState(0);

  useObservable(setName, store.userData$.value.name);
  useObservable(setPoints, store.userData$.value.points);

  return (
    <>
      <_Left css={{ flexBasis: "60%" }}>
        <img
          src={"/avatar.png"}
          css={{
            width: theme.spacing["24"],
            marginRight: theme.spacing["4"],
          }}
        />
        <div
          css={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            css={style.typography({
              color: theme.color.grey["600"],
              weight: theme.typography.weight.normal,
              size: theme.typography.size["2xl"],
              overflow: "truncate",
            })}
          >
            Hey there,
          </h2>
          <h1
            css={style.typography({
              weight: theme.typography.weight.semibold,
              size: theme.typography.size["3xl"],
              overflow: "truncate",
            })}
          >
            {name}
          </h1>
        </div>
      </_Left>
      <_Right css={{ flexBasis: "40%" }}>
        <KnowledgePoints points={points} />
      </_Right>
    </>
  );
};

const waitingView = (
  <div className="flex flex-col justify-center items-center h-full w-full">
    <PuffLoader color={"#3b82f6"} size={24} />
  </div>
);

export const UserInfo = () => (
  <_Wrapper>
    <ReactiveBuilder
      subject={store.userData$}
      builder={({ data }) => {
        console.log(data);
        if (data === undefined) return waitingView;
        return !data ? <_Unauthed /> : <_Authed />;
      }}
    />
  </_Wrapper>
);
