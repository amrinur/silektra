import { StatusSewa } from "@prisma/client";
import { z } from "zod";


export const alatSchema = z.object({
    id: z
    .string()
    .min(3, { message: "ID Alat must be at least 3 characters long!" })
    .max(20, { message: "ID Alat must be at most 20 characters long!" }),
  namalat: z.string().min(1, { message: "Nama Alat name is required!" }),
  merk: z.string().min(1, { message: "Merek is required!" }),
  tipealat: z.string().min(1, { message: "Tipe Alat is required!" }),
  lokasi: z.string().min(1, { message: "Lokasi is required!" }),
  kondisi: z.string().min(1, { message: "Kondisi is required!" }),
});

export type alatSchema = z.infer<typeof alatSchema>;

export const mahasiswaSchema = z.object({
    id: z
    .string()
    .min(8, { message: "NIM must be at least 8 characters long!" })
    .max(8, { message: "NIM must be at most 8 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters long!" }),
  name: z.string().min(1, { message: "First name is required!" }),
  angkatan: z.string().min(1, { message: "angkatan is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  img: z.string().optional(),
});

export type mahasiswaSchema = z.infer<typeof mahasiswaSchema>;

export const aslabSchema = z.object({
  id: z
    .string()
    .min(8, { message: "NIM must be at least 8 characters long!" })
    .max(8, { message: "NIM must be at most 8 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters long!" }),
  name: z.string().min(1, { message: "First name is required!" }),
  kbk: z.string().min(1, { message: "KBK is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  laboratorium: z.string().min(1, { message: "Laboratorium is required!" }),
  // img: z.string().optional(),
});

export type aslabSchema = z.infer<typeof aslabSchema>;

export const sewaSchema = z.object({
  id: z.coerce.number().optional(),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  alatId: z.string().nonempty({ message: "Alat ID is required!" }),
  mahasiswaId: z.string().nonempty({ message: "Mahasiswa ID is required!" }),
  StatusSewa: z.enum([  "PENDING", "DISETUJUI", "DITOLAK"])
});

export type sewaSchema = z.infer<typeof sewaSchema>;
