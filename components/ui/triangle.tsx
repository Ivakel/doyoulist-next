type TriangleProps = {
  hover: boolean;
};

const Triangle = ({ hover }: TriangleProps) => {
  return (
    <span
      className={`arrow-right absolute rotate-45 w-3 h-3 transition-all duration-150 ${
        hover ? "right-0 bottom-0" : "right-[0.2rem] bottom-[0.2rem]"
      }`}
    ></span>
  );
};

export default Triangle;
