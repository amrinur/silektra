"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { aslabSchema } from "@/lib/formValidationSchemas";
import { createAslab, updateAslab } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AslabForm = ({ type, data }: { type: "create" | "update" | "sewa"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<aslabSchema>({
    resolver: zodResolver(aslabSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createAslab : updateAslab,
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
      toast(`Aslab Berhasil ${type === "create" ? "ditambahkan" : "diupdated"}!`);
      setIsVisible(false); // Tutup modal setelah sukses
      router.refresh();
    }
  }, [state, router, type]);

  if (!isVisible) return null; // Tidak render apa-apa jika modal ditutup


  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
      {type === "create" ? "Create a new Aslab" : "Update the Aslab"}
      </h1>
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
          label="KBK"
          name="kbk"
          defaultValue={data?.kbk}
          register={register}
          error={errors.kbk}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Laboratorium"
          name="laboratorium"
          defaultValue={data?.laboratorium}
          register={register}
          error={errors.laboratorium}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AslabForm;