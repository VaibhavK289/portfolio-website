'use client';

import { useState } from 'react';
import { CuraSensePreview, CuraSenseScreenshot } from '@/components/CuraSensePreview';

export function CuraSensePreviewSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      {/* Interactive Screenshot */}
      <div className="relative h-[400px] sm:h-[500px] mb-12 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
        <CuraSenseScreenshot onClick={() => setIsPreviewOpen(true)} />
      </div>
      
      {/* Preview Modal */}
      <CuraSensePreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </>
  );
}
