'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { appPath } from '@/src/utils/paths';

/** Personal media page retired → Press kit. */
export default function MediaRedirectPage() {
  const router = useRouter();
  const target = appPath('/content/press');

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <div className="corp-page">
      <p className="corp-prose">
        The Media page has moved to the{' '}
        <Link href={target} className="corp-inline-link">
          Press kit
        </Link>
        .
      </p>
    </div>
  );
}
