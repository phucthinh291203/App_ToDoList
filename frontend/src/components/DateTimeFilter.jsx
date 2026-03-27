import * as React from "react"
import { options } from "@/lib/data"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
 
const DateTimeFilter = ({dateQuery, setDateQuery}) => {
  return (
    <Combobox
      items={options}
      itemToStringValue={(option) => option.label}
      onValueChange={(value)=> {
        console.log(`value changed: ${value}`)
        setDateQuery(value)
      }}
    >
      <ComboboxInput
       placeholder={!dateQuery ? "Select an option": dateQuery}
       />
      <ComboboxContent>
        <ComboboxEmpty> Today.</ComboboxEmpty>
        <ComboboxList>
          {(option) => (
            <ComboboxItem  key={option.value} value={option.value}
            >
            {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default DateTimeFilter