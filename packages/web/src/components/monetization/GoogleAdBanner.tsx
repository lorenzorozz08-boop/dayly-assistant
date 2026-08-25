import { useEffect } from 'react';

interface GoogleAdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical';
  responsive?: boolean;
}

export default function GoogleAdBanner({
  slot,
  format = 'auto',
  responsive = true,
}: GoogleAdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('Ads failed to load');
    }
  }, [slot]);

  return (
    <div className="my-4 text-center">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-layout="in-article"
        data-ad-format={format}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx" // Replace with your AdSense ID
        data-ad-slot={slot}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
