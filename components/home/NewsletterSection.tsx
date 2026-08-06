import { Container } from '@/components/ui/Container';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

export function NewsletterSection() {
  return (
    <section aria-labelledby="home-newsletter" className="border-y border-ink-200 bg-ink-50/70">
      <Container className="py-14 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="home-newsletter"
              className="text-balance text-2xl font-semibold tracking-[-0.015em] text-ink-900 sm:text-3xl"
            >
              Get the evaluation lessons before you sit through the demo
            </h2>
            <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              The RFP Software Brief breaks down one real buying decision every other
              Tuesday: what the team asked for, what they scored, and what they wish
              they&rsquo;d tested first.
            </p>
          </div>

          <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-card sm:p-7">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
