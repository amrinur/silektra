import SewaForm from "@/components/form/SewaFormV2";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { createSewa } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Alat, Prisma, Sewa } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type DaftarAlat = Sewa;

const DaftarAlatPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "kode sewa",
      accessor: "id",
    },
    {
      header: "ID",
      accessor: "alatId",
    },
    {
      header: "NIM",
      accessor: "mahasiswaId",
      className: "hidden md:table-cell",
    },
    {
      header: "Waktu Sewa",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "Waktu Pengembalian",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    {
      header: "Status Sewa",
      accessor: "statussewa",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
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
      <td className="flex items-center gap-4 p-4">{item.id}</td>
      <td className="hidden md:table-cell">{item.alatId}</td>
      <td className="hidden md:table-cell">{item.mahasiswaId}</td>
      <td className="hidden md:table-cell">{item.startTime ? new Date(item.startTime).toLocaleString() : 'N/A'}</td>
      <td className="hidden md:table-cell">{item.endTime ? new Date(item.endTime).toLocaleString() : 'N/A'}</td>
      <td className="hidden md:table-cell">{item.statussewa}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/daftar_alat/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <FormModal table="alat" type="update" data={item} />
              <FormModal table="alat" type="create" data={item.id}/>
            </>
          )}
          {role === "mahasiswa" && (
            <>
              {/* <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
              >
                <Image src="/assignment.png" alt="" width={16} height={16} />
              </button> */}
              <FormModal table="sewa" type="create" data={item}/>
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
            {role === "admin" && (
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
