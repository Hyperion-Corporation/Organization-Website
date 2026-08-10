'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { appPath } from '@/src/utils/paths';

/** Personal “other resources” index retired → FAQ. */
export default function OtherRedirectPage() {
  const router = useRouter();
  const target = appPath('/content/faq');

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <div className="corp-page">
      <p className="corp-prose">
        Other resources now live under the{' '}
        <Link href={target} className="corp-inline-link">
          FAQ
        </Link>
        .
      </p>
    </div>
  );
}
