type CountCircleProps = {
  count: number;
};
export default function CountCircle({ count }: Readonly<CountCircleProps>) {
  return (
    <span className="flex justify-center align-middle items-center rounded-full bg-[#00C898] w-4 h-4 mt-2">
      <h3 className="flex text-xs justify-center align-middle items-center text-white rounded-full bg-[#00C898] w-4 h-4">
        {count}
      </h3>
    </span>
  );
}
