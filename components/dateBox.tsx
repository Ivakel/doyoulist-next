import { getDate } from "@/lib/utils";

export default function DateBox() {
  const { day, weekday } = getDate();
  return (
    <div className="relative justify-center align-middle items-center h-min">
      <span className="absolute left-3 top-[-3px] w-[3px] h-[10px] bg-[#BAC7DB]" />
      <span className="absolute right-3 top-[-3px] w-[3px] h-[10px] bg-[#BAC7DB]" />
      <span className="w-[2.75rem] h-[3rem] top-[0.6rem] left-1.5 flex flex-col justify-center align-middle items-center gap-[-4px] p-1 rounded-md border-[3px] border-[#BAC7DB]">
        <h3 className="text-[#575293] font-semibold calendar-text">
          {weekday}
        </h3>
        <h3 className="mt-[-0.2rem] mx-auto text-xs text-[#8C83C9] tracking-wider">
          {day}
        </h3>
      </span>
    </div>
  );
}
