/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

interface GoogleAdScriptProps {
  isSubscribed: boolean;
  isLoggedIn: boolean;
}

const GoogleAdScript: React.FC<GoogleAdScriptProps> = ({
  isSubscribed,
  isLoggedIn,
}) => {
  useEffect(() => {
    if (!isSubscribed || !isLoggedIn) {
      // Inject the Google Ads script
      const script = document.createElement("script");
      script.src = import.meta.env.VITE_GOOGLE_ADS_LINK;
      script.async = true;
      document.body.appendChild(script);

      // Initialize the Google Ads script
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }

      gtag("js", new Date());
      gtag("config", import.meta.env.VITE_GOOGLE_ADS_ID);

      // Cleanup the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isSubscribed, isLoggedIn]);

  return null;
};

export default GoogleAdScript;
