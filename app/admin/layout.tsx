'use client'

import NavBar from "../components/NavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="w-full h-full">
   <NavBar />
          {children}
   </div>
  );
}
