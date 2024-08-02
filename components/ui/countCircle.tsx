type CountCircleProps = {
    count: number
}
export default function CountCircle({ count }: Readonly<CountCircleProps>) {
    return (
        <span className="mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#00C898] align-middle">
            <h3 className="flex h-4 w-4 items-center justify-center rounded-full bg-[#00C898] align-middle text-xs text-white">
                {count}
            </h3>
        </span>
    )
}
