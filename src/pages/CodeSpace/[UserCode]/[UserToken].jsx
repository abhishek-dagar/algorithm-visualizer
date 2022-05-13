import Router, { useRouter } from "next/router";
import App from "VisualApp";
import { actions } from "reducers";
import { connect } from "react-redux";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {
  return {
    props: {
      params: context.params,
    },
  };
};

const UserCode = (props) => {
  const router = useRouter();
  const params = router.query;
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <App match={{ params }} navigator={false}  user/>
    </>
  );
};

export default connect(
  ({ current, env, Theme }) => ({ current, env, Theme }),
  actions
)(UserCode);
