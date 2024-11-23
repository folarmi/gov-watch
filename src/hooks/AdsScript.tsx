/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

interface GoogleAdScriptProps {
  isSubscribed: boolean;
}

const GoogleAdScript: React.FC<GoogleAdScriptProps> = ({ isSubscribed }) => {
  useEffect(() => {
    if (!isSubscribed) {
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
      gtag("config", "YOUR_GOOGLE_ADS_ID");

      console.log("Google Ads script loaded for unsubscribed user");

      // Cleanup the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isSubscribed]);

  return null;
};

export default GoogleAdScript;
