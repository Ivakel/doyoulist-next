import { Button } from "@/components/ui/button";
import Image from "next/image";
import PP from "@/public/images/ian-dooley-lURrgmL9Hbw-unsplash.jpg";
import DropDownArrow from "@/public/svg/arrow-down.svg";
import Bell from "@/public/images/icons8-notification-bell-100.png";
import DateIcon from "@/public/svg/date-box-icon.svg";
import { getDate } from "@/lib/utils";
import CountCircle from "@/components/ui/countCircle";
import AddButton from "@/components/addButton";

export default function page() {
  const { day, weekday, month } = getDate();
  return (
    <section className="flex">
      <section className="flex flex-col w-[30%]">
        <div className="flex items-center p-6 justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={PP}
              alt="profile picture"
              width={85}
              height={85}
              priority
              className="inline-block size-12 rounded-full p-[2px] bg-[#00C898]"
            />

            <h3 className="font-medium">Ivakele</h3>

            <button className="items-center">
              <Image
                src={DropDownArrow}
                alt="dropdown arrow"
                width={20}
                height={20}
                priority
              />
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <Image src={Bell} width={20} height={20} alt="notification bell" />
            <Button className="bg-[#8C83C9]">Focus</Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <AddButton />
          <button className="flex hover:bg-[#D9D9D9] rounded-md p-2">
            <div className="relative">
              <Image
                className="w-14 h-14"
                src={DateIcon}
                width={20}
                height={20}
                alt="date icon"
              />
              <span className="absolute flex flex-col top-3 left-[.54rem] h-min gap-[-4px]">
                <h3 className="text-[#575293] font-semibold text-sm">
                  {weekday}
                </h3>
                <h3 className="mt-[-0.4rem] mx-auto text-sm text-[#8C83C9]">
                  {day}
                </h3>
              </span>
            </div>
            <details>
              <summary className="list-none flex">
                <div className="p-1">
                  <h1 className="font-semibold text-left transition-all duration-300">
                    Today
                  </h1>
                  <hr />
                  <h3 className="font-medium text-[0.6rem] text-slate-600 ml-1 text-left">
                    {
                      "Dont forget to do laundry, submit your accounting assingment..."
                    }
                  </h3>
                </div>
                <CountCircle count={5} />
                <div className="mt-[15px] ml-5">
                  <Image
                    src={DropDownArrow}
                    alt="dropdown arrow"
                    width={20}
                    height={20}
                  />
                </div>
              </summary>
              <p>
                Epcot is a theme park at Walt Disney World Resort featuring
                exciting attractions, international pavilions, award-winning
                fireworks and seasonal special events.
              </p>
            </details>
          </button>
          <div>
            <div>DateIcon</div>
            <details>
              <summary>
                <h2>Today</h2>
                <h1>
                  {
                    " forget to do laundry, submit your accounting assingment..."
                  }
                </h1>
                <h3>5</h3>
                <div>dropdown</div>
              </summary>
              <p>
                Epcot is a theme park at Walt Disney World Resort featuring
                exciting attractions, international pavilions, award-winning
                fireworks and seasonal special events.
              </p>
            </details>
          </div>
          <div>
            <div>DateIcon</div>
            <details>
              <summary>
                <h2>Today</h2>
                <h1>
                  {
                    " forget to do laundry, submit your accounting assingment..."
                  }
                </h1>
                <h3>5</h3>
                <div>dropdown</div>
              </summary>
              <p>
                Epcot is a theme park at Walt Disney World Resort featuring
                exciting attractions, international pavilions, award-winning
                fireworks and seasonal special events.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-centerw-[70%]">
        <h1>mainsection</h1>
      </section>
    </section>
  );
}
