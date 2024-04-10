import Link from "next/link";
import { Checkbox } from "./ui/checkbox";


export default function TermsAgree() {
  return (
    <div className="flex gap-2 px-3">
      <Checkbox className="data-[state=checked]:bg-[#8C83C9]"/>
      <h3 className="text-sm">I agree with the <Link href={"/"} className="text-[#2563EB]">Terms & Conditions</Link> of <span className="text-[#575293] font-bold">Orderdly</span></h3>
    </div>
  )
}
