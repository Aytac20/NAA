interface StepBarProps {
  step: 1 | 2;
  setStep: (value: 1 | 2) => void;
}

export default function StepBar({ step }: StepBarProps) {
  return (
    <div className="w-full flex items-center gap-2 cursor-pointer select-none my-6">
      {/* Step 1 */}
      <div
        className={`h-[3px] flex-1 rounded transition-all ${
          step >= 1 ? "bg-[#243C7B]" : "bg-[#243C7B]/30"
        }`}
      />

      {/* Step 2 */}
      <div
        className={`h-[3px] flex-1 rounded transition-all ${
          step >= 2 ? "bg-[#243C7B]" : "bg-[#243C7B]/30"
        }`}
      />
    </div>
  );
}
