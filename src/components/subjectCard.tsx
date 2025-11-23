interface SubjectCardProps {
  name: string
  nota: string
  progresso: string
  onClick?: () => void
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  nota,
  progresso,
  onClick,
}) => (
  <button
    type="button"
    className="
      min-w-[160px]
      max-w-[340px]
      w-fit
      p-6
      border-2 border-[#293296]
      font-['Signika']
      rounded-md
      bg-transparent
      flex flex-col items-center justify-center
      cursor-pointer
      transition-transform
      hover:scale-105
      focus:outline-none
      focus:ring-2 focus:ring-[#293296]
      text-center
    "
    onClick={onClick}
  >
    <span className="text-[#968D29] text-3xl font-normal mb-2 leading-none break-words w-full">
      {name}
    </span>
    <div className="flex w-full justify-around mt-2">
      <div className="flex flex-col items-center">
        <span className="text-[#968D29] text-lg font-normal">{nota}</span>
        <span className="text-[#555556] text-xs font-normal -mt-1">Nota</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[#968D29] text-lg font-normal">{progresso}</span>
        <span className="text-[#555556] text-xs font-normal -mt-1">
          Progresso
        </span>
      </div>
    </div>
  </button>
)

export default SubjectCard
