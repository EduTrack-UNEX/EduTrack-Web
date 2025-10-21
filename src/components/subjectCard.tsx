interface SubjectCardProps {
  name: string;
  nota: string;
  progresso: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ name, nota, progresso }) => (
  <div className="w-40 h-30 pt-6 border-[2px] border-[#293296] font-['Signika'] rounded-md bg-transparent flex flex-col items-center justify-center">
    <span className="text-[#968D29] text-4xl font-normal mb-2 leading-none">{name}</span>
    <div className="flex w-full justify-around mt-2">
      <div className="flex flex-col items-center">
        <span className="text-[#968D29] text-lg font-normal">{nota}</span>
        <span className="text-[##555556] text-xs font-normal -mt-1">Nota</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[#968D29] text-lg font-normal">{progresso}</span>
        <span className="text-[##555556] text-xs font-normal -mt-1">Progresso</span>
      </div>
    </div>
  </div>
);

export default SubjectCard;
