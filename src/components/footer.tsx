export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 mt-12 sm:mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          © {currentYear} Hugo Marinho Lapa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
