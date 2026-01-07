import type { ReactElement } from 'react';

function Spinner(): ReactElement {
  return (
    <div className="spinner" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px'}}>
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid #ddd',
          borderTopColor: '#4481c3',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      >
      </div>
      <p style={{margin: 0}}>Loading...</p>
      <style>
        {'@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'}
      </style>
    </div>
  );
}

export default Spinner;
