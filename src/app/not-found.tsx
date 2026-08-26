import { Cta } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="page-top pb-32">
      <div className="shell max-w-2xl">
        <p className="num text-5xl text-muted">404</p>
        <h1 className="mt-6 max-w-[16ch] text-5xl">
          The agent looked. This page is not here.
        </h1>
        <p className="mt-5 max-w-[48ch] text-md leading-relaxed text-muted">
          It checked the routes, found nothing, and did what it is built to do — stopped instead of
          guessing.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Cta href="/" arrow>
            Back to the homepage
          </Cta>
          <Cta href="/contact" variant="outline">
            Book a demo
          </Cta>
        </div>
      </div>
    </section>
  );
}
