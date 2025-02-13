import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Aslab } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";

const SingleAslabPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {

  const aslab:
    | (Aslab & {
      })
    | null = await prisma.aslab.findUnique({
    where: { id },
  });

  if (!aslab) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 px-40 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:full">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-8 rounded-md flex-0 flex gap-4 w-full justify-center">
            <div className="w-1/3">
              <Image
                src="/noavatar.png"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-2">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                {aslab.name}
                </h1>
                {role === "admin" && <FormModal table="alat" type="update" />}
              </div>
              <p className="text-sm text-gray-500">
                Deskripsi.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <span> Email : {aslab.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <span> Phone : {aslab.phone}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <span> KBK {aslab.kbk}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <span>Laboratorium : {aslab.laboratorium}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAslabPage;
