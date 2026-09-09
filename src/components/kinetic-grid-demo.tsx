import KineticGrid from "@/components/ui/kinetic-grid";

export default function KineticGridDemo() {
  return (
    <KineticGrid globalColor="gold">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="mb-5 rounded-full border border-[#D4AF37]/30 px-3 py-1 text-xs font-medium tracking-wide text-[#F7E7C4]">
          Interactive Background
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#F7E7C4] sm:text-6xl font-['Bebas_Neue']">
          Move your cursor. Click anywhere.
        </h1>
        <p className="mt-4 max-w-md text-base text-[#A8988B]">
          A kinetic grid that warps toward the pointer and ripples on every
          click.
        </p>
      </div>
    </KineticGrid>
  );
}
