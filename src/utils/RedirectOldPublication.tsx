import { Navigate, useParams } from "react-router-dom";

const RedirectOldPublication = () => {
  const { oldId } = useParams();

  return <Navigate to={`/publication/${oldId}`} replace />;
};

export { RedirectOldPublication };
