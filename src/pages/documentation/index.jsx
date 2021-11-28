import { useEffect } from "react";
import Router from "next/router";
const Documentation = () => {
  useEffect(() => {
    Router.push("/documentation/GetStarted/Introduction");
  }, []);
  return <></>;
};
export default Documentation;
