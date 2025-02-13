"use server";

import { revalidatePath } from "next/cache";
import {
  mahasiswaSchema,
  aslabSchema,
  alatSchema,
  sewaSchema
} from "./formValidationSchemas";
import prisma from "./prisma";
//import { clerkClient } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

import { createClerkClient } from "@clerk/clerk-sdk-node";

type CurrentState = { success: boolean; error: boolean };


export const createAslab = async (
  currentState: CurrentState,
  data: aslabSchema
) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.id,
      password: data.password,
      emailAddress: [data.email],
      publicMetadata:{role:"aslab"}
    });

    await prisma.aslab.create({
      data: {
        id: data.id,
        name: data.name,
        kbk: data.kbk,
        email: data.email,
        laboratorium: data.laboratorium,
        phone: data.phone || null,
        // img: data.img || null,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAslab = async (
  currentState: CurrentState,
  data: aslabSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const user = await clerkClient.users.updateUser(data.id, {
      username: data.id,
      ...(data.password !== "" && { password: data.password }),
    });

    await prisma.aslab.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        id: data.id,
        name: data.name,
        kbk: data.kbk,
        laboratorium: data.laboratorium,
        email: data.email || null,
        phone: data.phone || null,
        // img: data.img || null,
      },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAslab = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("username") as string;
  try {
    await clerkClient.users.deleteUser(id);

    await prisma.aslab.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAlat = async (
  currentState: CurrentState,
  data: typeof alatSchema._type
) => {
  try {
    await prisma.alat.create({
      data: {
        id: data.id,
        name: data.namalat,
        merk: data.merk,
        tipealat: data.tipealat,
        lokasi: data.lokasi,
        kondisi: data.kondisi,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAlat = async (
  currentState: CurrentState,
  data: typeof alatSchema._type
) => {
  try {
    await prisma.alat.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.namalat,
        merk: data.merk,
        tipealat: data.tipealat,
        lokasi: data.lokasi,
        kondisi: data.kondisi,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAlat = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  if (!id) {
    console.error("ID is required");
    return { success: false, error: true };
  }

  try {
    await prisma.alat.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createMahasiswa = async (
  currentState: CurrentState,
  data: mahasiswaSchema
) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.id,
      password: data.password,
      emailAddress: [data.email],
      publicMetadata:{role:"mahasiswa"}
    });

    await prisma.mahasiswa.create({
      data: {
        id: data.id,
        name: data.name,
        angkatan: data.angkatan,
        email: data.email,
        phone: data.phone || null,
        // img: data.img || null,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateMahasiswa = async (
  currentState: CurrentState,
  data: mahasiswaSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const user = await clerkClient.users.updateUser(data.id, {
      username: data.id,
      ...(data.password !== "" && { password: data.password }),
    });

    await prisma.mahasiswa.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        id: data.id,
        name: data.name,
        angkatan: data.angkatan,
        email: data.email,
        phone: data.phone || null,
      },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteMahasiswa = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await clerkClient.users.deleteUser(id);

    await prisma.aslab.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export const createSewa = async (
  state: { success: boolean; error: boolean },
  data: { startTime: Date; endTime: Date; alatId: string; mahasiswaId: string }
) => {
  try {
    console.log("createSewa called with data:", data);

    // Validasi keberadaan alat
    const alatExists = await prisma.alat.findUnique({
      where: {
        id: data.alatId,
      },
    });

    if (!alatExists) {
      const errorMessage = `Alat with ID ${data.alatId} does not exist.`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Validasi keberadaan mahasiswa
    const mahasiswaExists = await prisma.mahasiswa.findUnique({
      where: {
        id: data.mahasiswaId,
      },
    });

    if (!mahasiswaExists) {
      const errorMessage = `Mahasiswa with ID ${data.mahasiswaId} does not exist.`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Membuat data sewa baru dengan auto-increment untuk ID
    const newSewa = await prisma.sewa.create({
      data: {
        alatId: data.alatId,
        mahasiswaId: data.mahasiswaId, // Menggunakan mahasiswaId yang diteruskan
        startTime: data.startTime,
        endTime: data.endTime,
        statussewa: "PENDING", // Status default
      },
    });

    console.log("New Sewa created:", newSewa);

    // Pengembalian jika berhasil
    return { success: true, error: false, message: "Sewa successfully created." };
  } catch (err) {
    const errorMessage = `Error in createSewa: ${(err as Error).message}`;
    console.error(errorMessage);

    // Pengembalian jika terjadi kesalahan
    return { success: false, error: true, message: errorMessage };
  }
};



export const updateSewa = async (
  currentState: CurrentState,
  data: typeof sewaSchema._type
) => {
  try {
    await prisma.sewa.update({
      where: {
        id: data.id,
      },
      data: {
        alatId: data.alatId,
        statussewa: data.StatusSewa,
        startTime: data.startTime,
        endTime: data.endTime,
        mahasiswaId: data.mahasiswaId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSewa = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  if (!id) {
    return { success: false, error: true, message: "ID is required" };
  }

  try {
    await prisma.sewa.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // revalidatePath("/list/sewa");
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true, message: (err as Error).message };
  }
};