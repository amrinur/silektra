import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "aslab", "mahasiswa"],
      },
      {
        icon: "/teacher.png",
        label: "Asisten Lab",
        href: "/list/aslab",
        visible: ["admin", "aslab"],
      },
      {
        icon: "/student.png",
        label: "Mahasiswa",
        href: "/list/mahasiswa",
        visible: ["admin", "aslab"],
      },
      {
        icon: "/lesson.png",
        label: "Daftar Alat",
        href: "/list/daftar_alat",
        visible: ["admin", "aslab", "mahasiswa"],
      },
      {
        icon: "/exam.png",
        label: "Layanan",
        href: "/list/laporan",
        visible: ["admin", "aslab", "mahasiswa"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "aslab", "mahasiswa"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "aslab", "mahasiswa"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "aslab", "mahasiswa"],
      },
      {
        icon: "/message.png",
        label: "Contact US",
        href: "/",
        visible: ["admin", "aslab", "mahasiswa"],
      },
    ],
  },
];

const Menu = async () => {
  
  let user;
  try {
    user = await currentUser();
  } catch {
    return <div>Error fetching user menu</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const role = user?.publicMetadata.role as string;
  
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu