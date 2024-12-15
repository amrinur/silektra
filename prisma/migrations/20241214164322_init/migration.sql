-- CreateEnum
CREATE TYPE "StatusSewa" AS ENUM ('PENDING', 'DISETUJUI', 'DITOLAK');

-- DropEnum
DROP TYPE "Day";

-- CreateTable
CREATE TABLE "Sewa" (
    "id" SERIAL NOT NULL,
    "alatId" TEXT NOT NULL,
    "mahasiswaId" TEXT NOT NULL,
    "statussewa" "StatusSewa" NOT NULL,

    CONSTRAINT "Sewa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sewa" ADD CONSTRAINT "Sewa_alatId_fkey" FOREIGN KEY ("alatId") REFERENCES "Alat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewa" ADD CONSTRAINT "Sewa_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
