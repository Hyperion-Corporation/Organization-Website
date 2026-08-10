'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { appPath } from '@/src/utils/paths';

/** Personal-portfolio tools page retired → Products. */
export default function ToolsRedirectPage() {
  const router = useRouter();
  const target = appPath('/content/products');

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <div className="corp-page">
      <p className="corp-prose">
        The Tools page has moved to{' '}
        <Link href={target} className="corp-inline-link">
          Products
        </Link>
        .
      </p>
    </div>
  );
}
