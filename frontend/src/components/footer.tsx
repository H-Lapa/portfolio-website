export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} Hugo Marinho Lapa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
