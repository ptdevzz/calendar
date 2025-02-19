
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType: 'primary' | 'secondary'
}

export const Button = ({ buttonType, ...props }: ButtonProps) => {
    const primaryClass = 'text-dark-blue py-1 px-3 border-2 border-[#97BCD3] rounded-xl cursor-pointer hover:bg-light-blue hover:text-white hover:border-white'
    const secondaryClass = 'bg-dark-blue py-2 px-4 rounded-xl text-white font-light cursor-pointer'
    const typeClass: { [key: string]: string } = {
        primary: primaryClass,
        secondary: secondaryClass
    }
    return <button
        className={typeClass?.[buttonType]}
        {...props}
    >{props.children}</button>
}