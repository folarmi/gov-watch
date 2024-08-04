/* eslint-disable react-hooks/exhaustive-deps */
// hoc/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const withAdminAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { userType } = useAppSelector((state: RootState) => state.auth);

    // console.log(userType);

    useEffect(() => {
      const checkAuth = async () => {
        const authToken = sessionStorage.getItem("token");
        if (!authToken) {
          router.push("/");
        } else if (userType === "Editor") {
          router.push("/editor-dashboard");
        } else if (userType === "Contributor") {
          router.push("/contributor-dashboard");
        } else if (userType === "User") {
          router.push("/dashboard");
        } else {
          setLoading(false); // User is authenticated and an admin
        }
      };

      checkAuth();
    }, [router]);

    // Render null or a basic loading component while checking auth
    if (loading) {
      return null; // Or a minimal skeleton screen or placeholder
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAdminAuth;
