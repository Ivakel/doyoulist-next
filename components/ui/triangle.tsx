type TriangleProps = {
    hover: boolean
}

const Triangle = ({ hover }: TriangleProps) => {
    return (
        <span
            className={`arrow-right absolute h-3 w-3 rotate-45 transition-all duration-150 ${
                hover ? "bottom-0 right-0" : "bottom-[0.2rem] right-[0.2rem]"
            }`}
        ></span>
    )
}

export default Triangle
