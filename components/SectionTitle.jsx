export default function SectionTitle({ children, className = "" }) {
  return <h2 className={`text-2xl md:text-3xl font-bold text-foreground mb-6 ${className}`}>{children}</h2>
}
