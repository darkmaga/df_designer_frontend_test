import { SelectHTMLAttributes } from 'react'

export type Option = {
  label: string | number
  value: number
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[]
}

const Select = ({ options, value, onChange, ...rest }: Props) => {
  return (
    <select role='combobox' value={value} onChange={onChange} {...rest}>
      {options.map((option) => (
        <option role='option' value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
