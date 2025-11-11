interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center gap-2 border border-[#E0E0E0] rounded-lg px-3 py-2 bg-white focus-within:border-[#243C7B] transition">
      <img src="/search.png" className="w-4 h-4 opacity-60" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-[180px] text-sm outline-none"
      />
    </div>
  );
}
