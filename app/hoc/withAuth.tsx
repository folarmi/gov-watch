// hoc/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const authToken = sessionStorage.getItem("token");
        if (!authToken) {
          router.push("/");
        } else {
          setLoading(false);
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

export default withAuth;
