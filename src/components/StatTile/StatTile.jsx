function StatTile({ label, value, announceChanges = false }) {
  return (
    <div className="font-body flex-1 flex flex-col md:flex-row items-center md:justify-between rounded-[0.3125rem] bg-blue-100 px-8 py-2.5">
      <span className="text-[0.9375rem] md:text-lg leading-tight font-bold text-blue-400">{label}</span>
      <output aria-live={announceChanges ? "polite" : "off"}
      className="text-[1.5rem] md:text-[2rem] leading-tight font-bold text-blue-800">
        {value}
      </output>
    </div>
  );
}

export default StatTile;