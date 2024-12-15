import Announcements from "@/components/Announcements";
// import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type="mahasiswa"/>
            <UserCard type="admin"/>
            <UserCard type="aslab"/>
            <UserCard type="alat"/>
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-full h-[500px] ">
            {/* <CountChart /> */}
          </div>
        </div>
      </div>
      {/* RIGHT */}
    </div>
  );
};

export default AdminPage;