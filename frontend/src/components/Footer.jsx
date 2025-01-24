export default function Footer() {
    return (
      <footer className="h-24 w-full bg-gray-950 flex items-center justify-between px-8">
        {/* Logo */}
        <div>
          <img
            src="src/assets/CarAndAllLogo.svg"
            alt="CarAndAll logo"
            className="h-10"
          />
        </div>
        {/* Privacy Statement */}
        <div>
          <p className="text-white text-sm">
            <a
              href="/privacyverklaring"
              className="hover:underline"
              aria-label="Bekijk de privacyverklaring"
            >
              Privacyverklaring
            </a>
          </p>
        </div>
      </footer>
    );
  }
  