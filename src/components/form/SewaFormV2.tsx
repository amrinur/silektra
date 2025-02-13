"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputField from "../InputField";
import { sewaSchema } from "@/lib/formValidationSchemas";
import { createSewa, updateSewa } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useUser } from "@clerk/nextjs";

const SewaFormV2 = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<sewaSchema>({
    resolver: zodResolver(sewaSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createSewa : updateSewa,
    {
      success: false,
      error: false,
    }
  );

  const [isVisible, setIsVisible] = useState(true); // Kontrol modal internal
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response =
        type === "create"
          ? await createSewa(state, data)
          : await updateSewa(state, data);

      if (response.success) {
        toast.success(
          `Alat has been ${type === "create" ? "created" : "updated"}!`
        );
        setIsVisible(false); // Tutup modal
        router.refresh(); // Refresh halaman
      } else {
        toast.error(response.error || "An error occurred.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit the form.");
    }
  });

  useEffect(() => {
    if (state.success) {
      toast(`Alat has been ${type === "create" ? "created" : "updated"}!`);
      setIsVisible(false); // Tutup modal setelah sukses
      router.refresh();
    }
  }, [state, router, type]);

  if (!isVisible) return null; // Tidak render apa-apa jika modal ditutup

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <InputField
        label="ID Alat"
        name="alatId"
        defaultValue={data?.alatId}
        register={register}
        error={errors?.alatId}
        type="text"
      />

      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">ST</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("StatusSewa")}
          defaultValue={data?.statussewa}
        >
          <option value="PENDING">PENDING</option>
          <option value="DISETUJUI">DISETUJUI</option>
          <option value="DITOLAK">DITOLAK</option>
        </select>
        {errors.StatusSewa?.message && (
          <p className="text-xs text-red-400">
            {errors.StatusSewa.message.toString()}
          </p>
        )}
        <InputField
          label="ID Sewa"
          name="id"
          defaultValue={data?.id} // Pastikan ID dikirim jika update
          register={register}
          error={errors?.id}
          type="text"
        />
      </div>

      <InputField
        label="Mahasiswa ID"
        name="mahasiswaId"
        defaultValue={data?.mahasiswaId}
        register={register}
        error={errors?.mahasiswaId}
        type="text"
      />

      <InputField
        label="Start Date"
        name="startTime"
        defaultValue={
          data?.startTime ? data.startTime.toISOString().split("T")[0] : ""
        }
        register={register}
        error={errors?.startTime}
        type="date"
      />
      <InputField
        label="End Date"
        name="endTime"
        defaultValue={
          data?.endTime ? data.endTime.toISOString().split("T")[0] : ""
        }
        register={register}
        error={errors?.endTime}
        type="date"
      />

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SewaFormV2;
