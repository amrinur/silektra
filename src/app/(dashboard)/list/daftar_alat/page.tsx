import SewaForm from "@/components/form/SewaFormV2";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { createSewa } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Alat, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type DaftarAlat = Alat;

const DaftarAlatPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Nama Alat",
      accessor: "name",
    },
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Merk",
      accessor: "merk",
      className: "hidden md:table-cell",
    },
    {
      header: "Tipe Alat",
      accessor: "tipealat",
      className: "hidden md:table-cell",
    },
    {
      header: "Lokasi",
      accessor: "lokasi",
      className: "hidden md:table-cell",
    },
    {
      header: "Kondisi",
      accessor: "kondisi",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role == "aslab"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: DaftarAlat) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.merk}</td>
      <td className="hidden md:table-cell">{item.tipealat}</td>
      <td className="hidden md:table-cell">{item.lokasi}</td>
      <td className="hidden md:table-cell">{item.kondisi}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/daftar_alat/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {(role === "admin" || role == "aslab") && (
            <>
              <FormModal table="alat" type="update" data={item} />
              <FormModal table="alat" type="delete" id={item.id}/>
            </>
          )}
          {role === "mahasiswa" && (
            <>
              <FormModal table="sewa" type="update" data={item}/>
              <FormModal table="sewa" type="create" />
              
            </>
          )}
        </div>
      </td>
    </tr>
  );


  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.AlatWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          // Add other cases for different query parameters as needed
          default:
            break;
        }
      }
    }
  }

  console.log(query);

  const [data, count] = await prisma.$transaction([
    prisma.alat.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.alat.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Daftar Alat</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role == "aslab") && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="alat" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default DaftarAlatPage;
