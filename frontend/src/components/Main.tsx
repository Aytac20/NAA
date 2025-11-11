import NewAnnouncement from "./NewAnnouncement";
import NewsTable from "./NewsTable";

export default function Main() {
  return (
    <div className="p-6 w-full gap-1.5 overflow-y-auto">
      <NewAnnouncement />
      <NewsTable />
    </div>
  );
}
