import UserCard from "@/components/UserCard";
import Image from "next/image";

const AslabPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type="mahasiswa"/>
            <UserCard type="aslab"/>
            <UserCard type="alat"/>
            <UserCard type="sewa"/>
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-full h-[500px] ">
           <Image
                          src="/rektorat.jpg"
                          alt=""
                          width={1280}
                          height={857}
                        />  
          </div>
        </div>
      </div>
      {/* RIGHT */}
    </div>
  );
};

export default AslabPage;