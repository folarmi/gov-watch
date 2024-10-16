// hoc/withAuth.tsx
import { useEffect, useState, ComponentType } from "react";

import { useNavigate } from "react-router-dom";

const withAdminAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // console.log(userType);

    useEffect(() => {
      const checkAuth = async () => {
        const authToken = sessionStorage.getItem("token");
        if (!authToken) {
          navigate("/");
          // } else if (userType === "Editor") {
          //   router.push("/editor-dashboard");
          // } else if (userType === "Contributor") {
          //   router.push("/contributor-dashboard");
          // } else if (userType === "User") {
          //   router.push("/dashboard");
        } else {
          setLoading(false); // User is authenticated and an admin
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

export default withAdminAuth;
