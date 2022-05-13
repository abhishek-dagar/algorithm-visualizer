import { useRouter } from "next/router";
import App from "VisualApp"


export default function VisualPage() {
  const router = useRouter();
  const params = router.query;
  return (
    <>
      <App match={{params}} navigator/>
    </>
  );
}
