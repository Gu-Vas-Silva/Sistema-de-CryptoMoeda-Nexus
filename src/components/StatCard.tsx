type StatCardProps = {
  title: string | undefined
  value: number | undefined
  change: any
}


export function StatCard({title,value,change}: StatCardProps){
  return(
    <div className="bg-[#020617] border border-white/10 rounded-xl p-6">
      <p className="text-gray-400 text-sm">
        {title}
      </p>
      <h2 className="text-2xl font-bold mt-2">
        {value?.toLocaleString("pt-BR")}
      </h2>
      <p className="text-sm mt-1">
        <span className={`${change >= 0 ? "text-green-400" : "text-red-400"}`}>{change}%</span> vs mês anterior
      </p>
    </div>
  )
}