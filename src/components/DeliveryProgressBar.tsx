interface DeliveryProgressBarProps {
  subtotalAfterDiscount: number;
  threshold: number;
}

export function DeliveryProgressBar({
  subtotalAfterDiscount,
  threshold,
}: DeliveryProgressBarProps) {
  const isFreeUnlocked = subtotalAfterDiscount >= threshold;
  const remainingForFree = Math.max(0, threshold - subtotalAfterDiscount);
  const progressPercent = Math.min(100, (subtotalAfterDiscount / threshold) * 100);

  return (
    <div className="delivery-progress-box">
      <div className="progress-label">
        {isFreeUnlocked ? (
          <span style={{ color: '#34d399', fontWeight: 600 }}>
            🎉 Free delivery unlocked!
          </span>
        ) : (
          <span>
            Add <strong>${remainingForFree.toFixed(2)}</strong> for Free Delivery
          </span>
        )}
        <span>${threshold.toFixed(0)}</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
