import Script from 'next/script';

export default function ReownAppKitScript() {
  return (
    <Script
      src="https://unpkg.com/@reown/appkit@1.7.10/dist/reown-appkit.umd.js"
      strategy="beforeInteractive"
      onError={() => {
        alert('Failed to load Reown AppKit script.');
      }}
    />
  );
}
