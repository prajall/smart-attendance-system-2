import AttendanceGrid from "@/components/Grid";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="bg-blue">page</h1>
      <h1 className="bg-pink">page</h1>
      <div className="overflow-x-auto">
        <AttendanceGrid />
      </div>
    </div>
  );
}
