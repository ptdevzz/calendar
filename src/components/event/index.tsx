interface EventProps {
    title?: string
}

const Event = ({ title }: EventProps) => {
    const statusClass = {
        confirmed: 'bg-light-orange text-light-blue before:bg-dark-blue',
        pending: 'bg-dark-orange text-dark-blue before:bg-light-blue',
        cancel: 'bg-dark-blue text-gray-300 before:bg-dark-orange'
    }
    return <div
        onClick={(e) => {
            e.stopPropagation()
        }}
        className={`cursor-pointer mb-1 p-1 pl-2 py-[6px] rounded-md relative before:absolute before:w-1 before:h-full before:top-0 before:left-0 overflow-hidden ${statusClass['cancel']}`}>
        <p className="text-xs line-clamp-1" title={title}>{title}</p>
    </div>
}



export default Event