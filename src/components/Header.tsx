interface HeaderProps {
  backendSource: 'api' | 'fallback';
  version: string;
}

export function Header({ backendSource, version }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-icon">
          <img
            src="src/assets/images/thrivecart.png"
            alt="Acme Widgets"
            className="widget-image"
            width={48}
          />
        </div>
        <div>
          <h1 className="brand-title">Acme Widget Co</h1>
        </div>
      </div>

      <div className="header-badges">
        <div className={`status-badge ${backendSource === 'fallback' ? 'fallback' : ''}`}>
          <span className="pulse-dot" />
          <span>
            {backendSource === 'api'
              ? 'PHP 8.2 API (Connected)'
              : 'Local Mode (PHP Offline)'}
          </span>
        </div>
        <span className="version-pill">v{version}</span>
      </div>
    </header>
  );
}
