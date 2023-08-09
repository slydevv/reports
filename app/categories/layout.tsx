"use client";
import NavBar from "../components/NavBar";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
