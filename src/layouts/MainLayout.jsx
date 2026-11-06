import { Header } from "../component/Header";
import { ButtomNav } from "../component/ButtomNav";
import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <>
      <div className="flex flex-col w-full h-dvh overflow-hidden">
        <Header />

        <main className="flex-1 bg-[#F3F4F6] min-h-0 overflow-hidden p-4 flex flex-col">
          <Outlet />
        </main>

        <footer className="h-[60px] shrink-0 bg-[#F3F4F6] flex items-center px-4 justify-center">
          <ButtomNav />
        </footer>
      </div>

      <div></div>
    </>
  );
}
