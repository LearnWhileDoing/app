import {useWindowSize}       from "react-use";
import {useEffect, useState} from "react";

const WithDrawer = () => {
  const {width} = useWindowSize();

  const [showDrawer, setShowDrawer] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowDrawer(width >= 768);
  });

  return <div></div>
};

export default WithDrawer;
