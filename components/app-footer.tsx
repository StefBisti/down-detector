import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col px-4 sm:px-8 lg:px-12 gap-8 mb-8">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8">
        <div className="flex flex-col">
          <p className="text-lg font-bold mb-2">Main Site</p>
          <Link href="/for-business" className="text-lg hover:underline">
            For Business
          </Link>
          <Link href="/services" className="text-lg hover:underline">
            Services
          </Link>
          <Link href="/methodology" className="text-lg hover:underline">
            Methodology
          </Link>
          <Link href="/help" className="text-lg hover:underline">
            Help
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold mb-2">Try our apps</p>
          <a href="https://example.com" className="text-lg hover:underline">
            Google Play
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            App Store
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Ookla Brands
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Speedtest.net
          </a>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold mb-2">Social Media</p>
          <a href="https://example.com" className="text-lg hover:underline">
            X
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Facebook
          </a>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold mb-2">Legal</p>
          <a href="https://example.com" className="text-lg hover:underline">
            Privacy Preferences
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Accessibility statement
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Terms of use
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Privacy policy
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Do not sell my personal information
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Modern slavery policy
          </a>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold mb-2">Contact us</p>
          <a href="https://example.com" className="text-lg hover:underline">
            Media inquiries
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Downdetector explorer sales inquiries
          </a>
          <a href="https://example.com" className="text-lg hover:underline">
            Site feedback
          </a>
        </div>
      </div>

      <p>
        &copy; 2006-2026 Ookla, LLC., an Accenture company. All Rights Reserved.
        Downdetector® is among the federally registered trademarks of Ookla, LLC
        and may only be used with explicit written permission.
      </p>
    </footer>
  );
}
