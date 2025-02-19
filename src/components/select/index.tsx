

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { label: string; value: string }[]
}

export const Select = ({ options, ...props }: SelectProps) => {
    return <select
        className="bg-light-blue py-2 pl-4 pr-10 text-white font-extralight rounded-xl select-custom appearance-none bg-no-repeat"
        {...props}>
        {options.map((option) => {
            return <option value={option.value} key={option.value}>{option.label}</option>
        })}

    </select>
}