import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to find your team?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Don&apos;t hack alone. Post your skills and connect with other
            builders at Blitz.
          </p>
          <div className="mt-8">
            <Link href="/post">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white px-8">
                Post Your Skills Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
