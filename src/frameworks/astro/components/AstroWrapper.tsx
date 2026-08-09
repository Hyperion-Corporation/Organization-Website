'use client';

import { appPath } from '../../../utils/paths';
import React, { useEffect, useRef } from 'react';

export function AstroWrapper() {
  return (
    <div style={{ padding: '1rem', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px' }}>
      <iframe
        src={appPath("/astro-island/index.html")}
        style={{
          width: '100%',
          minHeight: '300px',
          border: 'none',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
        title="Astro Island"
      />
    </div>
  );
}
