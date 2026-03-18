type AssetCardProps = {
  name: string
  amount: string
  color: string
}

export function AssetCard({ name, amount, color }: AssetCardProps) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-r ${color} border border-white/10`}>
      <p className="text-gray-300 text-sm">
        {name}
      </p>
      <h3 className="text-xl font-bold mt-1">
        {amount}
      </h3>
    </div>
  )
}