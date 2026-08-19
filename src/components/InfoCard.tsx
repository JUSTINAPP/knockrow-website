interface InfoCardProps {
  label: string
  value: React.ReactNode
}

// Ported from Volpino's InfoCard, retokened to Knockrow's palette/fonts.
export default function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="bg-sand/40 rounded-[4px] border-l-2 border-amber-dark px-[18px] py-4">
      <p className="text-[9px] tracking-[0.18em] uppercase text-amber-dark font-sans font-normal mb-1">
        {label}
      </p>
      <div className="text-[13px] text-ink font-sans font-light leading-[1.6]">{value}</div>
    </div>
  )
}
