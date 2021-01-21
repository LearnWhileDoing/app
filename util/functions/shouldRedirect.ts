import { NextRouter } from "next/router";

const cases: { [k: string]: [() => boolean, (router: NextRouter) => string] } = {
  //"/course/[id]/content": [() => !store.value.userData, (router: NextRouter) => "/course/" + router.query.id],
};

function shouldRedirect(router: NextRouter): false | string {
  console.log(cases);
  const redirect = cases[router.pathname];
  if (!redirect) return false;
  if (!redirect[0]()) return false;
  return redirect[1](router);
}

export default shouldRedirect;
