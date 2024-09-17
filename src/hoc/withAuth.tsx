// hoc/withAuth.tsx

import { useEffect, useState, ComponentType } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const authToken = sessionStorage.getItem("token");
        if (!authToken) {
          navigate("/");
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [navigate]);

    // Render null or a basic loading component while checking auth
    if (loading) {
      return null; // Or a minimal skeleton screen or placeholder
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
