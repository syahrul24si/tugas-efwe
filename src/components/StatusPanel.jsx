export default function StatusPanel({ accent }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
        Status
      </h2>

      <div className="mt-4 space-y-3 text-sm text-white/75">
        <div className="flex items-center justify-between rounded-lg bg-black/20 px-4 py-3">
          <span>System Access</span>
          <span className="font-semibold text-[#7ed957]">Online</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-black/20 px-4 py-3">
          <span>Last Sync</span>
          <span className="font-semibold text-white">Just now</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-black/20 px-4 py-3">
          <span>Theme Accent</span>
          <span className="flex items-center gap-2 font-semibold text-white">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: accent }}
            />
            Active
          </span>
        </div>
      </div>
    </div>
  )
}
