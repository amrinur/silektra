import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const laboratorium = [
  "Lab TTL",
  "Lab KOMJAR",
  "Lab IK",
  "Lab TELKOM",
  "Lab ELEKTRONIKA",
];

const kbk = ["TKT", "SEL", "KM"];

const namaAlat = [
  "Rigol 113",
  "Fluke Multimeter",
  "Tektronix TDS",
  "Agilent 34401A",
  "Keithley 2400",
];
const merkAlat = ["Rigol", "Fluke", "Tektronix", "Agilent", "Keithley"];
const tipeAlat = [
  "Osiloskop",
  "Multimeter",
  "Power Supply",
  "Function Generator",
  "Signal Analyzer",
];

const kondisiAlat = ["Baik", "Rusak", "Perbaikan"];

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  // ASLAB
  for (let i = 1; i <= 15; i++) {
    const randomLab =
      laboratorium[Math.floor(Math.random() * laboratorium.length)]; // Random lab selection
    const randomKBK = kbk[Math.floor(Math.random() * kbk.length)]; // Random lab selection
    
    await prisma.aslab.create({
      data: {
        id: `I0710${i}`, // Unique ID for the teacher
        name: `Name${i}`,
        email: `aslab${i}@ft.uns.ac.id`,
        phone: `123-456-789${i}`,
        kbk: randomKBK,
        laboratorium: randomLab,
      },
    });
  }

  // STUDENT
  for (let i = 1; i <= 50; i++) {
    const randomAngkatan = getRandomAngkatan();
    await prisma.mahasiswa.create({
      data: {
        id: `I0722${i}`,
        name: `Mahasiswa${i}`,
        angkatan: `${randomAngkatan}`,
        email: `student${i}@ft.uns.ac.id`,
        phone: `987-654-321${i}`,
      },
    });
  }

  // ALAT
  for (let i = 1; i <= 30; i++) {
    const randomNama = namaAlat[Math.floor(Math.random() * namaAlat.length)];
    const randomMerk = merkAlat[Math.floor(Math.random() * merkAlat.length)];
    const randomTipe = tipeAlat[Math.floor(Math.random() * tipeAlat.length)];
    const randomLokasi =
      laboratorium[Math.floor(Math.random() * laboratorium.length)];
    const randomKondisi =
      kondisiAlat[Math.floor(Math.random() * kondisiAlat.length)];

    await prisma.alat.create({
      data: {
        id: `LTE${i}`, // ID unik alat
        name: randomNama, // Nama alat random
        merk: randomMerk, // Merk alat random
        tipealat: randomTipe, // Tipe alat random
        lokasi: randomLokasi, // Lokasi lab random
        kondisi: randomKondisi, // Kondisi alat random
      },
    });
  }

  console.log("Seeding completed successfully.");
}

function getRandomAngkatan(): number {
  return Math.floor(Math.random() * 10) + 2020;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
