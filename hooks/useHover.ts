"use client"

import { Dispatch, SetStateAction, useState } from "react"

const useHover = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [hover, setHover] = useState<boolean>(false)
    return [hover, setHover]
}

export default useHover
