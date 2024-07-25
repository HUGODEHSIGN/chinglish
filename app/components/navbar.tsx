import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import Link from "next/link";

const config = [
  {
    display: "Translate",
    href: "/translate",
  },
  {
    display: "Explain",
    href: "/explain",
  },
];

export default function Navbar() {
  return (
    <>
      <header className="shadow-xl border p-4 m-4 rounded-full">
        <nav className="flex gap-4">
          <Button size="icon" className="rounded-full" asChild>
            <Link href="/">
              <House width={20} />
            </Link>
          </Button>
          {config.map(({ display, href }) => (
            <div key={href}>
              <Button>
                <Link href={href}>{display}</Link>
              </Button>
            </div>
          ))}
        </nav>
      </header>
    </>
  );
}
