import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      {/* ── APPROACH (HERO) ── */}
      <section
        id="approach"
        className="relative min-h-screen flex items-center px-4 sm:px-8 lg:px-16 pt-32 pb-20 overflow-hidden"
      >
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_40%,rgba(184,148,46,0.04),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_10%_90%,rgba(184,148,46,0.03),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-7xl w-full">
          <FadeIn>
            <h1 className="font-serif text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.1] text-foreground max-w-[700px] font-normal mb-16">
              AI-powered websites and products{" "}
              <em className="italic text-rivet">that shine.</em>
            </h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Bridge Diagram */}
          <FadeIn direction="left">
            <div className="relative h-[280px] sm:h-[350px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Left box */}
                <div className="w-36 sm:w-40 h-48 sm:h-52 border border-border-color bg-white flex items-center justify-center flex-col gap-2 border-r-0">
                  <span className="text-3xl opacity-70">📊</span>
                  <span className="font-display text-sm tracking-[0.2em] text-foreground-light">
                    BUSINESS
                  </span>
                </div>
                {/* Center */}
                <div className="w-24 sm:w-28 h-48 sm:h-52 flex items-center justify-center relative">
                  {/* Horizontal lines */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-border-color" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-border-color" />
                  {/* Vertical line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-rivet to-transparent" />
                  {/* Pulsing circle */}
                  <div className="w-10 h-10 rounded-full bg-rivet relative z-10 animate-[pulse-glow_3s_infinite]" />
                  {/* AI label */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[0.75rem] tracking-[0.3em] text-rivet z-20 bg-background px-2">
                    A I
                  </span>
                </div>
                {/* Right box */}
                <div className="w-36 sm:w-40 h-48 sm:h-52 border border-border-color bg-white flex items-center justify-center flex-col gap-2 border-l-0">
                  <span className="text-3xl opacity-70">⚙️</span>
                  <span className="font-display text-sm tracking-[0.2em] text-foreground-light">
                    ENGINEERING
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <div>
            <FadeIn>
              <div className="text-[0.75rem] font-semibold tracking-[0.25em] uppercase text-rivet mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-rivet" />
                Why Riveted
              </div>
              <h2 className="font-serif text-[clamp(2.4rem,4vw,3.6rem)] text-foreground mb-6 max-w-[650px] font-normal leading-[1.1]">
                Built by engineers. Designed for business owners.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[1.05rem] leading-[1.9] text-foreground-light mb-5">
                Most agencies are either business strategists who can&apos;t
                ship, or engineers who can&apos;t communicate value. Riveted
                was built by leaders who&apos;ve operated at the intersection
                — shipping products at Google, scaling engineering teams at
                startups, and building AI-powered tools from scratch.
              </p>
              <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
                Whether we&apos;re building your small business a site that
                drives leads, or architecting an AI product with your team —
                we bring the same engineering rigor and business sense to
                everything we do.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-8 sm:gap-12 mt-10 pt-6 border-t border-border-light">
                {[
                  { number: "25+", label: "Years in engineering & leadership" },
                  { number: "10×", label: "Faster delivery with AI tooling" },
                  { number: "100%", label: "Built to drive results" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-[2.5rem] leading-none text-rivet">
                      {stat.number}
                    </div>
                    <div className="text-sm text-foreground-light mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl w-full">
          {/* Headline */}
          <FadeIn>
            <div className="mb-16">
              <h2 className="font-serif text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.1] text-foreground max-w-[700px] font-normal">
                What We Build
              </h2>
            </div>
          </FadeIn>

          {/* Two Service Tracks */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Track 1: Small Business */}
              <div
                id="smb"
                className="bg-white border border-border-light p-8 sm:p-10 transition-all duration-400 hover:border-border-color hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="font-display text-[3.5rem] leading-none text-rivet/15 mb-4">
                  01
                </div>
                <span className="inline-block text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-rivet px-3 py-1.5 border border-rivet/25 mb-6">
                  For Small Businesses
                </span>
                <h3 className="font-serif text-[1.8rem] text-foreground mb-4 font-normal">
                  AI-Powered Websites
                </h3>
                <p className="text-base leading-[1.8] text-foreground-light mb-6">
                  We build websites for small businesses that don&apos;t just
                  look good — they generate leads, convert customers, and grow
                  revenue. AI tools let us deliver fast, and smart integrations
                  like AI assistants keep your site working while you sleep.
                </p>
                <ul className="space-y-0 mb-6">
                  {[
                    "SEO-optimized, conversion-focused design",
                    "AI assistants (Intercom) for 24/7 lead capture",
                    "Smart forms & automated follow-ups",
                    "Fast delivery powered by AI tooling",
                    "Ongoing support & growth strategy",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-foreground-light py-2 border-b border-border-light last:border-b-0"
                    >
                      <span className="text-rivet font-bold text-sm">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-foreground-light italic pt-4 border-t border-border-light">
                  <strong className="not-italic text-foreground">
                    Best for:
                  </strong>{" "}
                  Local businesses, service companies, e-commerce shops, and
                  anyone whose website should be their #1 salesperson.
                </div>
              </div>

              {/* Track 2: Consulting */}
              <div
                id="consulting"
                className="bg-white border border-border-light p-8 sm:p-10 transition-all duration-400 hover:border-border-color hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="font-display text-[3.5rem] leading-none text-rivet/15 mb-4">
                  02
                </div>
                <span className="inline-block text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-rivet px-3 py-1.5 border border-rivet/25 mb-6">
                  For Founders & Teams
                </span>
                <h3 className="font-serif text-[1.8rem] text-foreground mb-4 font-normal">
                  AI Web App Consulting
                </h3>
                <p className="text-base leading-[1.8] text-foreground-light mb-6">
                  Have an idea for an AI-powered product? We partner with
                  founders and teams to design, build, and ship
                  production-grade web applications — from concept through
                  launch. Think of us as your technical co-founder.
                </p>
                <ul className="space-y-0 mb-6">
                  {[
                    "Full-stack development (React, Node, Python, etc.)",
                    "AI/LLM integrations & agent architectures",
                    "API design, data pipelines & infrastructure",
                    "Shopify apps, SaaS products, internal tools",
                    "Technical strategy & architecture consulting",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-foreground-light py-2 border-b border-border-light last:border-b-0"
                    >
                      <span className="text-rivet font-bold text-sm">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-foreground-light italic pt-4 border-t border-border-light">
                  <strong className="not-italic text-foreground">
                    Best for:
                  </strong>{" "}
                  Founders with a product idea, startups needing engineering
                  muscle, and businesses building AI-powered tools.
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Track 3: Engineering Coaching */}
          <FadeIn delay={0.3}>
            <div
              id="coaching"
              className="mt-8 bg-white border border-border-light p-8 sm:p-10 transition-all duration-400 hover:border-border-color hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="font-display text-[3.5rem] leading-none text-rivet/15 mb-4">
                03
              </div>
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-rivet px-3 py-1.5 border border-rivet/25 mb-6">
                For Engineering Teams
              </span>
              <h3 className="font-serif text-[1.8rem] text-foreground mb-2 font-normal">
                Engineering Coaching
              </h3>
              <p className="font-serif text-[clamp(1.4rem,2.5vw,1.8rem)] text-foreground-light mb-8 font-normal">
                Engineering coaching that{" "}
                <em className="italic text-rivet">actually ships.</em>
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { number: "1→23", label: "Engineers scaled" },
                  { number: "2×", label: "PR throughput gained" },
                  { number: "$20M+", label: "Platform volume in 10 mo" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-5 border border-border-light bg-background"
                  >
                    <div className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-none text-rivet">
                      {stat.number}
                    </div>
                    <div className="text-sm text-foreground-light mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div className="border border-border-light bg-background-alt p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rivet to-rivet-light flex items-center justify-center font-semibold text-lg text-white shrink-0">
                    RG
                  </div>
                  <div>
                    <div className="text-lg font-medium text-foreground">
                      Ricky Garcia
                    </div>
                    <div className="text-sm text-foreground-light">
                      Founder, Riveted · MIT CS · Caltech AI/ML
                    </div>
                  </div>
                </div>
                <div className="text-[0.95rem] leading-[1.75] text-foreground-light space-y-4">
                  <p>
                    Ricky has spent 25+ years building software and leading engineering teams across
                    every stage of company growth — and has the playbooks to
                    prove it.
                  </p>
                  <p>
                    At{" "}
                    <strong className="text-foreground font-medium">
                      Google
                    </strong>
                    , he managed cross-functional developer tools on YouTube Ads,
                    drove multi-year technical roadmaps, and coached engineers
                    through promotions. At{" "}
                    <strong className="text-foreground font-medium">
                      LeaseLock
                    </strong>{" "}
                    (Series B), he scaled the engineering org from 1
                    engineer — himself — to 23, making architecture, hiring, and
                    product decisions with high autonomy. As{" "}
                    <strong className="text-foreground font-medium">
                      CTO of Bend
                    </strong>{" "}
                    (seed stage), he shipped a production platform handling $20M+
                    in collections in 10 months, doubled PR throughput with
                    AI-assisted workflows, and delivered a partner integration
                    the client called &ldquo;record time.&rdquo;
                  </p>
                  <p>
                    He&apos;s not here to hand you a framework deck. He&apos;s
                    done the work — built the teams, shipped the products,
                    navigated the chaos — and he&apos;ll help your team do the
                    same.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {[
                    "Google / YouTube Ads",
                    "Series B VP Eng",
                    "Seed-Stage CTO",
                    "AI-Native Builder",
                    "MIT · Caltech",
                  ].map((cred) => (
                    <span
                      key={cred}
                      className="text-[0.65rem] font-medium px-2.5 py-1 bg-background text-foreground-light rounded-sm border border-border-light"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    num: "01",
                    title: "Velocity & Efficiency",
                    desc: "Ship faster without burning out your team. We audit your development lifecycle and implement the workflows, tooling, and AI-assisted practices that eliminate drag.",
                    items: [
                      "Sprint and delivery process optimization",
                      "AI coding tool adoption (Claude Code, CodeRabbit, Copilot)",
                      "Code review and CI/CD pipeline tuning",
                      "Developer experience and tooling audits",
                    ],
                  },
                  {
                    num: "02",
                    title: "Value & Prioritization",
                    desc: "Stop building the wrong things. We help engineering leaders align technical work to business outcomes — so every sprint delivers customer value, not just story points.",
                    items: [
                      "OKR and roadmap alignment with product/business",
                      "Technical debt triage and paydown strategy",
                      "Cross-functional stakeholder engagement",
                      "Build vs. buy decision frameworks",
                    ],
                  },
                  {
                    num: "03",
                    title: "Scale & Team Growth",
                    desc: "Grow your team without losing speed. From your first hire to your twentieth, we bring the lessons from scaling orgs through seed, Series A, and Series B.",
                    items: [
                      "Hiring playbooks and interview design",
                      "Engineering ladder and career frameworks",
                      "1:1 coaching, PIPs, and performance management",
                      "On-call, incident response, and team structure",
                    ],
                  },
                ].map((pillar) => (
                  <div
                    key={pillar.num}
                    className="border border-border-light p-5 bg-background"
                  >
                    <div className="font-display text-[2rem] leading-none text-rivet/15 mb-2">
                      {pillar.num}
                    </div>
                    <h4 className="text-base font-medium text-foreground mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-sm leading-[1.65] text-foreground-light mb-4">
                      {pillar.desc}
                    </p>
                    <ul className="space-y-0">
                      {pillar.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-2 text-sm text-foreground-light py-1.5 border-b border-border-light last:border-b-0"
                        >
                          <span className="text-rivet font-bold text-sm shrink-0">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="text-sm text-foreground-light italic pt-4 border-t border-border-light">
                <strong className="not-italic text-foreground">
                  Best for:
                </strong>{" "}
                Seed to Series B startups with 2–30 engineers who need to move
                faster, hire smarter, and ship what matters — without the
                overhead of a full-time VP of Engineering.
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ── INTERCOM EXAMPLE ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 bg-background-alt">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-[0.75rem] font-semibold tracking-[0.25em] uppercase text-rivet mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-rivet" />
              Small Business Websites · In Action
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] text-foreground mb-8 max-w-[650px] font-normal">
              An AI assistant that handles customers while you run your business.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
            {/* Explainer */}
            <FadeIn delay={0.1} direction="left">
              <div>
                <h3 className="font-serif text-[1.6rem] text-foreground mb-5 font-normal">
                  Imagine you run a plumbing company.
                </h3>
                <p className="text-base leading-[1.8] text-foreground-light mb-4">
                  It&apos;s 9 PM. A homeowner finds a leak under their kitchen
                  sink. They land on your website and — instead of a contact
                  form you&apos;ll see tomorrow morning — they get an instant
                  conversation with an AI assistant powered by Intercom.
                </p>
                <p className="text-base leading-[1.8] text-foreground-light mb-8">
                  The assistant knows your services, your pricing, your service
                  area. It answers questions, qualifies the lead, and books an
                  appointment — all before your competitor&apos;s voicemail
                  picks up.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      num: "1",
                      title: "We train it on your business.",
                      desc: "Services, FAQs, pricing, service area — loaded into Intercom's AI so it answers like your best employee.",
                    },
                    {
                      num: "2",
                      title: "It lives on your website 24/7.",
                      desc: "Visitors get instant, helpful answers — no waiting, no phone trees, no missed leads.",
                    },
                    {
                      num: "3",
                      title: "It books and qualifies leads for you.",
                      desc: "The AI collects contact info, understands the problem, and schedules the appointment — you wake up to a full calendar.",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 items-start">
                      <span className="font-display text-[1.4rem] text-rivet leading-[1.4] min-w-[28px]">
                        {step.num}
                      </span>
                      <p className="text-[0.95rem] leading-[1.6] text-foreground-light">
                        <strong className="text-foreground font-semibold">
                          {step.title}
                        </strong>{" "}
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Chat Mockup */}
            <FadeIn delay={0.2} direction="right">
              <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden max-w-[380px] mx-auto lg:ml-auto">
                {/* Chat Header */}
                <div className="bg-rivet text-white px-5 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center text-sm">
                    🔧
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">
                      Ace Plumbing Assistant
                    </div>
                    <div className="text-[0.7rem] opacity-80">
                      Typically replies instantly
                    </div>
                  </div>
                  <span className="text-lg opacity-70">×</span>
                </div>

                {/* Messages */}
                <div className="p-5 flex flex-col gap-3 min-h-[260px]">
                  <div className="self-start max-w-[85%] bg-[#f0f0f0] text-foreground rounded-xl rounded-bl-sm px-4 py-3 text-sm leading-[1.5]">
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-rivet mb-1">
                      AI Assistant
                    </div>
                    Hi! I&apos;m Ace Plumbing&apos;s virtual assistant. How can
                    I help you tonight?
                  </div>
                  <div className="self-end max-w-[85%] bg-rivet text-white rounded-xl rounded-br-sm px-4 py-3 text-sm leading-[1.5]">
                    I have a leak under my kitchen sink — is this something you
                    can fix?
                  </div>
                  <div className="self-start max-w-[85%] bg-[#f0f0f0] text-foreground rounded-xl rounded-bl-sm px-4 py-3 text-sm leading-[1.5]">
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-rivet mb-1">
                      AI Assistant
                    </div>
                    Absolutely — kitchen sink leaks are one of our most common
                    calls. We serve the entire metro area. Would you like to
                    book a repair visit? We have morning availability tomorrow.
                  </div>
                  <div className="self-end max-w-[85%] bg-rivet text-white rounded-xl rounded-br-sm px-4 py-3 text-sm leading-[1.5]">
                    Yes please, morning works great.
                  </div>
                  <div className="self-start max-w-[85%] bg-[#f0f0f0] text-foreground rounded-xl rounded-bl-sm px-4 py-3 text-sm leading-[1.5]">
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-rivet mb-1">
                      AI Assistant
                    </div>
                    Perfect! I&apos;ve got you down for tomorrow 8–10 AM. Can I
                    grab your name, address, and phone number so our tech can
                    confirm?
                  </div>
                </div>

                {/* Input Bar */}
                <div className="border-t border-[#eee] px-5 py-3 flex items-center gap-2">
                  <span className="flex-1 text-sm text-[#999]">
                    Type a message...
                  </span>
                  <div className="w-7 h-7 bg-rivet rounded-full flex items-center justify-center text-white text-sm">
                    ↑
                  </div>
                </div>
                <div className="text-center py-2 text-[0.65rem] text-[#999]">
                  Powered by Intercom + Riveted
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 bg-background-alt">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-[0.75rem] font-semibold tracking-[0.25em] uppercase text-rivet mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-rivet" />
              Case Studies
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] text-foreground mb-10 max-w-[650px] font-normal">
              Built by Riveted.
            </h2>
          </FadeIn>

          <div className="space-y-10">
            {/* WeatherFreight */}
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-border-light grid grid-cols-1 lg:grid-cols-2 transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:border-border-color">
                {/* Screenshot */}
                <div className="min-h-[320px] lg:min-h-[360px] bg-gradient-to-br from-[#1a2332] to-[#0f1923] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,rgba(59,130,246,0.08),transparent)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_80%_70%,rgba(184,148,46,0.06),transparent)]" />
                  <div className="relative z-10 p-8 text-center w-full">
                    <div className="font-display text-3xl tracking-[0.1em] text-white mb-2">
                      Weather<span className="text-[#60a5fa]">Freight</span>
                    </div>
                    <p className="text-[0.75rem] text-white/60 mb-6">
                      AI-powered weather intelligence for shipping perishables &
                      beverages
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {[
                        {
                          title: "Route Analysis",
                          desc: "Weather along entire route",
                        },
                        {
                          title: "Optimal Window",
                          desc: "Safe arrival timing",
                        },
                        {
                          title: "Shopify Integration",
                          desc: "Auto order notes",
                        },
                      ].map((feat) => (
                        <div
                          key={feat.title}
                          className="bg-white/[0.06] border border-white/10 rounded-md px-4 py-2 text-center"
                        >
                          <strong className="block text-[0.7rem] text-[#60a5fa] mb-0.5">
                            {feat.title}
                          </strong>
                          <span className="text-[0.65rem] text-white/70">
                            {feat.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-rivet mb-3">
                    Shopify App · SaaS Product
                  </div>
                  <h3 className="font-serif text-[1.8rem] text-foreground mb-2 font-normal">
                    WeatherFreight
                  </h3>
                  <p className="text-[0.95rem] leading-[1.7] text-foreground-light mb-4">
                    A full AI-powered Shopify app built from concept to
                    production. WeatherFreight monitors weather conditions along
                    shipping routes to protect temperature-sensitive products —
                    recommending optimal fulfillment windows and automatically
                    attaching shipping notes to every order.
                  </p>
                  <p className="text-[0.95rem] leading-[1.7] text-foreground-light mb-5">
                    This is the kind of product we help founders and businesses
                    bring to life: real AI solving a real problem, shipped to
                    production and listed on the Shopify App Store.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {[
                      "AI / ML",
                      "Shopify App",
                      "Weather API",
                      "Route Optimization",
                      "TypeScript / Next.js",
                      "Node.js",
                      "SaaS",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] font-medium px-2.5 py-1 bg-background-alt text-foreground-light rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://weatherfreight.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-rivet tracking-[0.05em] transition-[gap] hover:gap-3"
                  >
                    Visit weatherfreight.com →
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* LeadDig */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-border-light grid grid-cols-1 lg:grid-cols-2 transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:border-border-color">
                {/* Screenshot */}
                <div className="min-h-[320px] lg:min-h-[360px] bg-gradient-to-br from-[#1c1a0e] to-[#0f0e08] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,rgba(217,180,60,0.08),transparent)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_80%_70%,rgba(245,158,11,0.06),transparent)]" />
                  <div className="relative z-10 p-8 text-center w-full">
                    <div className="font-display text-3xl tracking-[0.1em] text-white mb-2">
                      Lead<span className="text-amber-400">Dig</span>
                    </div>
                    <p className="text-[0.75rem] text-white/60 mb-6">
                      AI-powered permit intelligence for construction contractors
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {[
                        {
                          title: "Permit Scraping",
                          desc: "Daily municipal data",
                        },
                        {
                          title: "AI Classification",
                          desc: "Type, value & contractor",
                        },
                        {
                          title: "Territory Alerts",
                          desc: "Real-time notifications",
                        },
                      ].map((feat) => (
                        <div
                          key={feat.title}
                          className="bg-white/[0.06] border border-white/10 rounded-md px-4 py-2 text-center"
                        >
                          <strong className="block text-[0.7rem] text-amber-400 mb-0.5">
                            {feat.title}
                          </strong>
                          <span className="text-[0.65rem] text-white/70">
                            {feat.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-rivet mb-3">
                    B2B SaaS · Construction Tech
                  </div>
                  <h3 className="font-serif text-[1.8rem] text-foreground mb-2 font-normal">
                    LeadDig
                  </h3>
                  <p className="text-[0.95rem] leading-[1.7] text-foreground-light mb-4">
                    A B2B SaaS platform that gives construction contractors
                    real-time visibility into building permits filed in their
                    local markets. LeadDig scrapes municipal permit databases
                    daily, uses AI to classify each permit by type, value, and
                    contractor — then surfaces the opportunities that matter
                    most.
                  </p>
                  <p className="text-[0.95rem] leading-[1.7] text-foreground-light mb-5">
                    Contractors using LeadDig see 100% of permit activity in
                    their territory — not just the 10% they hear about through
                    referrals. Set your map, save your searches, and get alerts
                    before competitors even know a project exists.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {[
                      "AI / ML",
                      "Data Scraping",
                      "Map Intelligence",
                      "Real-Time Alerts",
                      "TypeScript / Next.js",
                      "Node.js",
                      "SaaS",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] font-medium px-2.5 py-1 bg-background-alt text-foreground-light rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://leaddig.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-rivet tracking-[0.05em] transition-[gap] hover:gap-3"
                  >
                    Visit leaddig.io →
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── TESTIMONIAL ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="font-serif text-[5rem] leading-[0.5] text-rivet/50 mb-6">
              &ldquo;
            </div>
            <blockquote className="font-serif text-[clamp(1.5rem,2.5vw,2.2rem)] italic text-foreground leading-[1.5] mb-8">
              We went from a site that just existed to one that converts
              every day. Riveted understood exactly what our business needed
              — and delivered it fast.
            </blockquote>
            <p className="text-sm font-medium text-foreground-light">
              — Marco Marano, Founder
            </p>
            <p className="text-xs text-[#999] mt-1">Prima Pave</p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ── FOOTER CTA ── */}
      <section
        id="contact"
        className="py-20 sm:py-32 px-4 sm:px-8 lg:px-16 text-center relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(184,148,46,0.04),transparent)] pointer-events-none" />
        <div className="relative mx-auto max-w-2xl">
          <FadeIn>
            <div className="text-[0.75rem] font-semibold tracking-[0.25em] uppercase text-rivet mb-4 flex items-center justify-center gap-3">
              Get Started
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,4.5vw,4rem)] text-foreground mb-5">
              Ready to be riveted?
            </h2>
            <p className="text-[1.05rem] text-foreground-light max-w-[500px] mx-auto mb-10 leading-[1.7]">
              Whether you need a website that generates leads or a partner to
              build your AI product — let&apos;s talk. Free consultation, no
              obligations.
            </p>
            <a
              href="mailto:hello@rivetedinc.com"
              className="inline-block bg-rivet text-white px-10 py-4 text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:bg-rivet-light hover:shadow-[0_4px_30px_rgba(184,148,46,0.25)]"
            >
              hello@rivetedinc.com
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
