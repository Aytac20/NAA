export default function Logo() {
  return (
    <div className="border-b border-(--border-gray-1) px-4  flex items-center py-6 ">
      <img
        src="/logo.png"
        alt="NAA Control Panel Logo"
        className="h-8 w-auto object-contain"
      />
    </div>
  );
}
