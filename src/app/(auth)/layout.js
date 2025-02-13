import React from "react";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[300px]">{children}</div>
    </div>
  );
}
