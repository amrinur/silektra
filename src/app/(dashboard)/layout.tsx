import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
      <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 pl-3"
        >
          <Image src="/uns-logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">SILEKTRA</span>
        </Link>
        <Menu></Menu>        
      </div>
      {/* right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F9F6EE] overflow-scroll">
      <Navbar/>
        {children}
      </div>


    </div>


  );
}