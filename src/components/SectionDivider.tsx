export default function SectionDivider() {
  return (
    <div className="flex items-center gap-4 px-4 sm:px-8 lg:px-16">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-color to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-rivet" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-color to-transparent" />
    </div>
  );
}
