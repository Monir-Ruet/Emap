import Bangladesh from "@/app/(app)/_components/bangladesh";
import RealTimeViolance from "./_components/realtime";
import Name from "./_components/name";

export default function Home() {
  return (
    <div className="m-auto bg-white flex flex-row items-center justify-between min-h-screen">
      <RealTimeViolance />
      <Bangladesh />
      <Name />
    </div>

  );
}
