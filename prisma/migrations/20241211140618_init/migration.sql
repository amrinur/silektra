-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aslab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "img" TEXT,
    "kbk" TEXT NOT NULL,
    "laboratorium" TEXT NOT NULL,

    CONSTRAINT "Aslab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "angkatan" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "img" TEXT,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "merk" TEXT NOT NULL,
    "tipealat" TEXT NOT NULL,
    "img" TEXT,
    "lokasi" TEXT NOT NULL,
    "kondisi" TEXT NOT NULL,

    CONSTRAINT "Alat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Aslab_email_key" ON "Aslab"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aslab_phone_key" ON "Aslab"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_email_key" ON "Mahasiswa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_phone_key" ON "Mahasiswa"("phone");
