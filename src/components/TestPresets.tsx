import type { TestPreset } from '../types';

interface TestPresetsProps {
  presets: TestPreset[];
  activePreset: string | null;
  currentTotal: number;
  onApplyPreset: (preset: TestPreset) => void;
}

export function TestPresets({
  presets,
  activePreset,
  currentTotal,
  onApplyPreset,
}: TestPresetsProps) {
  return (
    <div className="presets-card">
      <h2 className="section-title">
        <span>⚡ Official Test Baskets</span>
      </h2>
      <div className="presets-grid">
        {presets.map((preset) => {
          const isActive = activePreset === preset.id;
          const isMatching =
            isActive && Math.abs(currentTotal - preset.expectedTotal) < 0.01;

          return (
            <button
              key={preset.id}
              className={`preset-btn ${isActive ? 'active' : ''}`}
              onClick={() => onApplyPreset(preset)}
            >
              <div className="preset-title">
                {preset.name} {isMatching && '✅'}
              </div>
              <div className="preset-items">[{preset.codes.join(', ')}]</div>
              <div className="preset-total">
                Expected: ${preset.expectedTotal.toFixed(2)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
