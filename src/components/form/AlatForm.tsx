"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { alatSchema } from "@/lib/formValidationSchemas";
import { useRouter } from "next/navigation";
import { createAlat, updateAlat } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const AlatForm = ({ type, data }: { type: "create" | "update" | "sewa"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<alatSchema>({
    resolver: zodResolver(alatSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createAlat : updateAlat,
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
      toast(`Alat berhasil ${type === "create" ? "ditambahkan" : "diupdate"}!`);
      setIsVisible(false); // Tutup modal setelah sukses
      router.refresh();
    }
  }, [state, router, type]);

  if (!isVisible) return null; // Tidak render apa-apa jika modal ditutup
  
  return (
    
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type} Alat Baru</h1>
      <span className="text-xs text-gray-400 font-medium">
      Tambahkan Informasi
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nama Alat"
          name="namalat"
          defaultValue={data?.name}
          register={register}
          error={errors.namalat}
        />
        <InputField
          label="ID Alat"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors.id}
        />
        <InputField
          label="Merk"
          name="merk"
          defaultValue={data?.merk}
          register={register}
          error={errors.merk}
        />
        <InputField
          label="Tipe Alat"
          name="tipealat"
          defaultValue={data?.tipealat}
          register={register}
          error={errors.tipealat}
        />
        <InputField
          label="Lokasi"
          name="lokasi"
          defaultValue={data?.lokasi}
          register={register}
          error={errors.lokasi}
        />
        <InputField
          label="Kondisi"
          name="kondisi"
          defaultValue={data?.kondisi}
          register={register}
          error={errors.kondisi}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Kondisi</label>
          {/* <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("kondisi")}
            defaultValue={data?.kondisi}
          >
            <option value="BAIK">Baik</option>
            <option value="RUSAK">Rusak</option>
            <option value="PERBAIKAN">Perbaikan</option>
          </select> */}
          {/* {errors.kondisi?.message && (
            <p className="text-xs text-red-400">
              {errors.kondisi.message.toString()}
            </p>
          )} */}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          {/* <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )} */}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AlatForm;