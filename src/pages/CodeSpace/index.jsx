import Router, { useRouter } from "next/router";
import App from "VisualApp";
import { languages } from "common/config";
import { actions } from "reducers";
import { connect } from "react-redux";
import { useEffect } from "react";

const CodeSpace = (props) => {
  const router = useRouter();
  const params = router.query;
  const handleAddFile = () => {
    const { ext } = props.env;
    const language = languages.find((language) => language.ext === ext);
    const file = { ...language.skeleton };
    file.name = `untitled.${ext}`;
    const algorihtm = { algorithmName: file.name.split(".")[0],categoryName: file.name.split(".")[0], files: [file] };
    props.setAlgorithm(algorihtm);
  };

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      Router.push("/");
    }
    handleAddFile();
  }, []);
  return (
    <>
      <App match={{ params }} navigator={false} newFile={true} user/>
    </>
  );
};

export default connect(
  ({ current, env, Theme }) => ({ current, env, Theme }),
  actions
)(CodeSpace);
