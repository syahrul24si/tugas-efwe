export default function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
      <span className="text-white/65">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  )
}
