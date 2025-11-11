interface SuccessModalProps {
  onClose: () => void; 
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-[#17171799] flex items-center justify-center z-999">
      <div className="bg-white w-[510px] rounded-2xl p-5 flex flex-col items-center gap-2 animate-fadeIn">
        <button
          className="self-end text-[#666] hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="h-24 w-24 bg-[#ceffe1] flex items-center justify-center rounded-full">
          <img src="/success.png" alt="success" className="h-[72px] w-[72px]" />
        </div>

        <div className="text-center max-w-[420px]">
          <h2 className="text-[24px] font-semibold text-[#1E1E1E] mb-2">
            Added Successfully!
          </h2>
          <p className="text-[15px] text-[#666] leading-[22px]">
            Your news added successfully.
          </p>
        </div>

        <button
          className="w-full bg-[#243C7B] py-3 px-7 rounded-lg text-white text-[18px] font-medium hover:opacity-85 transition mt-4"
          onClick={onClose}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
