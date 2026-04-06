import React, { useState, useMemo } from "react";

const sizeClasses = {
  sm: "h-5 w-5 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className = "",
  ...props
}) {
  const [imgError, setImgError] = useState(false);

  const initials = useMemo(() => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const baseClasses =
    "relative flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-700 font-medium";

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;

  return (
    <div className={combinedClasses} {...props}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}