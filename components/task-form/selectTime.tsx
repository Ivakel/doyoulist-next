import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/selectForTime"
import { Dispatch, SetStateAction } from "react"

type Props = {
    setHours: Dispatch<SetStateAction<string>>
    setMinutes: Dispatch<SetStateAction<string>>
    currentHour: string
    currentMinute: string
}

export default function SelectTime({
    setHours,
    setMinutes,
    currentHour,
    currentMinute,
}: Props) {
    return (
        <div className="mx-7 flex h-[30px] rounded-sm border-[1px] dark:border-slate-800">
            <Select onValueChange={(value) => setHours(value)}>
                <SelectTrigger className="h-[30px] w-[30px] border-none border-transparent p-1 focus:border-transparent focus:ring-0 focus-visible:ring-0">
                    <SelectValue placeholder={currentHour} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>00</SelectLabel>
                        <SelectItem value="00">00</SelectItem>
                        <SelectItem value="01">01</SelectItem>
                        <SelectItem value="02">02</SelectItem>
                        <SelectItem value="03">03</SelectItem>
                        <SelectItem value="04">04</SelectItem>
                        <SelectItem value="05">05</SelectItem>
                        <SelectItem value="06">06</SelectItem>
                        <SelectItem value="07">07</SelectItem>
                        <SelectItem value="08">08</SelectItem>
                        <SelectItem value="09">09</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="13">13</SelectItem>
                        <SelectItem value="14">14</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="17">17</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                        <SelectItem value="19">19</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="21">21</SelectItem>
                        <SelectItem value="22">22</SelectItem>
                        <SelectItem value="23">23</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <span>:</span>
            <Select onValueChange={(value) => setMinutes(value)}>
                <SelectTrigger className="h-[30px] w-[30px] border-none border-transparent p-1 focus:border-transparent focus:ring-0 focus-visible:ring-0">
                    <SelectValue placeholder={currentMinute} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>00</SelectLabel>
                        <SelectItem value="00">00</SelectItem>
                        <SelectItem value="01">01</SelectItem>
                        <SelectItem value="02">02</SelectItem>
                        <SelectItem value="03">03</SelectItem>
                        <SelectItem value="04">04</SelectItem>
                        <SelectItem value="05">05</SelectItem>
                        <SelectItem value="06">06</SelectItem>
                        <SelectItem value="07">07</SelectItem>
                        <SelectItem value="08">08</SelectItem>
                        <SelectItem value="09">09</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="13">13</SelectItem>
                        <SelectItem value="14">14</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="17">17</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                        <SelectItem value="19">19</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="21">21</SelectItem>
                        <SelectItem value="22">22</SelectItem>
                        <SelectItem value="23">23</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="26">26</SelectItem>
                        <SelectItem value="27">27</SelectItem>
                        <SelectItem value="28">28</SelectItem>
                        <SelectItem value="29">29</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="31">31</SelectItem>
                        <SelectItem value="32">32</SelectItem>
                        <SelectItem value="33">33</SelectItem>
                        <SelectItem value="34">34</SelectItem>
                        <SelectItem value="35">35</SelectItem>
                        <SelectItem value="36">36</SelectItem>
                        <SelectItem value="37">37</SelectItem>
                        <SelectItem value="38">38</SelectItem>
                        <SelectItem value="39">39</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                        <SelectItem value="41">41</SelectItem>
                        <SelectItem value="42">42</SelectItem>
                        <SelectItem value="43">43</SelectItem>
                        <SelectItem value="44">44</SelectItem>
                        <SelectItem value="45">45</SelectItem>
                        <SelectItem value="46">46</SelectItem>
                        <SelectItem value="47">47</SelectItem>
                        <SelectItem value="48">48</SelectItem>
                        <SelectItem value="49">49</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="51">51</SelectItem>
                        <SelectItem value="52">52</SelectItem>
                        <SelectItem value="53">53</SelectItem>
                        <SelectItem value="54">54</SelectItem>
                        <SelectItem value="55">55</SelectItem>
                        <SelectItem value="56">56</SelectItem>
                        <SelectItem value="57">57</SelectItem>
                        <SelectItem value="58">58</SelectItem>
                        <SelectItem value="59">59</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
