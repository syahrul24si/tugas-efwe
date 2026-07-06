function UserIcon({ accent }) {
  return (
    <div
      className="mx-auto flex h-11 w-11 items-center justify-center rounded-md text-white shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
      style={{ backgroundColor: accent }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.4-8 5.4 0 .9.7 1.6 1.6 1.6h12.8c.9 0 1.6-.7 1.6-1.6 0-3-3.6-5.4-8-5.4Z" />
      </svg>
    </div>
  )
}

export default function StatCard({ label, value, accent }) {
  return (
    <article
      className="w-full max-w-[320px] rounded-xl border bg-[#ececec] px-5 py-6 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_12px_30px_rgba(0,0,0,0.18)]"
      style={{ borderColor: accent }}
    >
      <UserIcon accent={accent} />

      <div className="mt-4 inline-flex min-w-5 items-center justify-center rounded-sm bg-[#7ed957] px-1.5 text-[11px] font-bold text-black">
        {value}
      </div>

      <h3 className="mt-3 text-sm font-medium text-[#111]">
        Total {label}
      </h3>
    </article>
  )
}
