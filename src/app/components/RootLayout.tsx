import { Outlet } from "react-router";
import { TopNavigation } from "./TopNavigation";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <TopNavigation />
      <Outlet />
    </div>
  );
}