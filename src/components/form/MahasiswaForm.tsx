"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { mahasiswaSchema } from "@/lib/formValidationSchemas";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createMahasiswa, updateMahasiswa } from "@/lib/actions";
import { useFormState } from "react-dom";

const MahasiswaForm = ({ type, data }: { type: "create" | "update" | "sewa"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<mahasiswaSchema>({
    resolver: zodResolver(mahasiswaSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createMahasiswa : updateMahasiswa,
    {
      success: false,
      error: false,
    }
  );

  const [isVisible, setIsVisible] = useState(true); // Kontrol modal internal
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Mahsiswa Berhasil ${type === "create" ? "ditambahkan" : "diupdated"}!`);
      setIsVisible(false); // Tutup modal setelah sukses
      router.refresh();
    }
  }, [state, router, type]);

  if (!isVisible) return null; // Tidak render apa-apa jika modal ditutup

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Tambahkan Mahasiswa Baru</h1>
      {type === "create" ? "Create a new Mahasiswa" : "Update the Mahasiswa"}
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="NIM"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nama"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Angkatan"
          name="angkatan"
          defaultValue={data?.angkatan}
          register={register}
          error={errors.angkatan}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">       
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default MahasiswaForm;