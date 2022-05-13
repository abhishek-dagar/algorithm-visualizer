import APP from "VisualApp";
export const getServerSideProps = async (context) => {
  return {
    props: {
      params: context.params,
    },
  };
};
export default function algorithm(props) {
  const params = props.params;
  return (
    <>
      <APP match={{ params }} navigator/>
    </>
  );
}
