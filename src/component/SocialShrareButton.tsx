/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface ShareButtonIconProps {
  Button: React.ComponentType<any>;
  Icon: React.ComponentType<any>;
  url?: string;
  publicId?: string;
}

const ShareButtonIcon: React.FC<ShareButtonIconProps> = ({
  Button,
  Icon,
  url,
  publicId,
}) => {
  const shareUrl = url ?? `https://www.govwatch.ng/publication/${publicId}`;

  return (
    <div className="transition-transform duration-200 hover:opacity-80 hover:scale-105">
      {React.createElement(Button, { url: shareUrl }, <Icon size={32} round />)}
    </div>
  );
};

export { ShareButtonIcon };
