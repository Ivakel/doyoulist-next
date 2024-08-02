import Link from "next/link"
import { Checkbox } from "./ui/checkbox"
import { FormControl, FormItem } from "./ui/form"
import { MutableRefObject, Ref } from "react"

type Props = {
    agreementRef: MutableRefObject<Ref<HTMLButtonElement> | undefined>
}

export default function TermsAgree({ agreementRef }: Props) {
    return <h1>car</h1>
}
