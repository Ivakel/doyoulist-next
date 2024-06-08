import { getDate } from "@/lib/utils";

export default function DateBox() {
  const { day, weekday } = getDate();
  return (
    <div className="relative h-min items-center justify-center align-middle">
      <span className="absolute top-[-3px] h-[10px] w-[1px] rounded-full border-[#BAC7DB] bg-[#BAC7DB] md:left-[8px] md:border-[2px]" />
      <span className="absolute top-[-3px] h-[10px] w-[3px] rounded-full border-[2.5px] border-[#BAC7DB] bg-[#BAC7DB] md:right-[8px]" />
      <span className="left-1.5 top-[0.6rem] flex flex-col items-center justify-center gap-[-4px] rounded-md border-[2.5px] border-[#BAC7DB] p-1 align-middle md:h-[34px] md:w-[30px]">
        <h3 className="calendar-text font-semibold text-[#575293]">
          {weekday}
        </h3>
        <h3 className="mx-auto mt-[-0.2rem] text-xs tracking-wider text-[#8C83C9]">
          {day}
        </h3>
      </span>
    </div>
  );
}
