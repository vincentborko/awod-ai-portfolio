type TickerStripProps = {
  items: string[];
};

export function TickerStrip({ items }: TickerStripProps) {
  const loopItems = [...items, ...items];

  return (
    <div className="ticker-wrap" aria-label="Service highlights">
      <div className="ticker-track">
        {loopItems.map((item, index) => (
          <span className="ticker-item" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
