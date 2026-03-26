"use client";

import FadeIn from "./FadeIn";

export default function BlogContent_TechnicalCoFounder() {
  return (
    <article className="space-y-6">
      <FadeIn>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Earlier this year, I built{" "}
          <a
            href="https://weatherfreight.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rivet hover:underline"
          >
            WeatherFreight
          </a>
          , an AI-powered Shopify app that monitors weather along shipping
          routes to protect temperature-sensitive products. From first
          conversation to Shopify App Store acceptance, it took about sixty
          days. Two people. No outside funding. No engineering team. Just a
          non-technical co-founder with a clear product vision and me writing
          code.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          That is what a good technical co-founder partnership looks like. Not
          because we were fast (though we were), but because we never got
          stuck. We never spent two weeks debating architecture. We never
          over-built something nobody had asked for yet. We shipped, got
          feedback, and iterated. Sixty days, idea to App Store.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          I want to tell you what made that work, because if you are a
          non-technical founder looking for your technical counterpart, the
          things that actually matter are probably not the things you think
          they are.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          The Biggest Mistake Founders Make
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Here it is, plainly: most non-technical founders hire someone who
          spends too much time on the wrong things.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          They find an engineer who wants to design the perfect database
          schema before a single user has touched the product. Or someone who
          insists on building a microservices architecture for an app that has
          zero customers. Or someone who spends three weeks choosing between
          frameworks when the real question is whether anyone will pay for
          this thing at all.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          The point of a v1 is not to be beautiful. It is to exist. A working
          product in front of real users will teach you more in a week than
          six months of planning in a vacuum. If your technical co-founder
          does not viscerally understand this, you will burn through time and
          money building something nobody wanted. But hey, at least it will
          scale to ten million users it will never have.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          What Actually Worked: The WeatherFreight Story
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          My co-founder came to the table with a strong product vision and a
          willingness to make decisions. He had done the research. He knew the
          market. He understood the problem. Merchants shipping perishable
          goods and beverages were losing product to weather they could have
          predicted.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Week one, we scoped the product together. He made a key early call:
          instead of hardcoding temperature ranges by product type (30-80°F
          for chocolate, 32-90°F for beverages), the system should let
          merchants set their own min and max thresholds. That was a product
          decision, not a technical one. He owned it, and it was the right
          call. It made the product flexible enough to serve use cases we had
          not thought of yet.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Weeks two and three, I went heads down. I built the core weather
          route logic, including an MCP server that uses AI to determine
          likely shipping waypoints and grabs weather forecasts for each one.
          My co-founder did not need to understand what an MCP server was. He
          trusted that I had a good approach, and I trusted that he would tell
          me if the output did not match what merchants needed.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Week four was getting the build ready for Shopify review. Weeks five
          and six were the review process itself, iterating on Shopify&apos;s
          feedback until the app passed. Weeks six through eight were
          preparing for a soft launch.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          During that entire process, my co-founder kept doing what he was
          good at: competitor research, customer conversations, product
          direction. One great example: he came back from a round of
          competitor research and said we should add logic for cold packs and
          heat packs. If a merchant adds insulated packaging, the system could
          expand the safe temperature window by about ten degrees in either
          direction. That was a meaningful product insight that came from
          understanding the market, not from writing code. I implemented it.
          Took a day or two. Huge value add.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          That is the dynamic you want. One person owns the product and the
          market. The other person owns the technical execution. Both trust
          each other&apos;s domain. Decisions happen fast because nobody is
          stepping on anyone else&apos;s turf.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          The Three Questions to Ask Your Potential Technical Co-Founder
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          If you are evaluating someone, whether it is a co-founder, a first
          hire, or a consulting partner, here are three questions that will
          tell you a lot:
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light font-medium">
          1. &ldquo;Would you rather ship a less polished product quickly to
          get market signal, or spend more time building something polished
          before anyone sees it?&rdquo;
        </p>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light mt-3">
          You want someone who picks speed. Not recklessness, but speed. The
          right answer sounds something like &ldquo;get it in front of users
          fast, then polish based on what we learn.&rdquo; If they start
          talking about technical debt and doing things right the first time,
          that is a yellow flag. Technical debt is real, but it is a problem
          for products that have users. First, get users.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light font-medium">
          2. &ldquo;If I asked you to build a feature that would take three
          months, how would you push back? And if I had a request that was
          technically easy but I thought was hard, how would you work with
          me?&rdquo;
        </p>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light mt-3">
          This one tests communication in both directions. You want someone
          who can say &ldquo;that is a three-month feature, but here is a
          version we could ship in two weeks that gets us eighty percent of
          the value.&rdquo; You also want someone who will not just nod along
          when you suggest something simple that they could knock out in a
          day. They should be proactive about saying &ldquo;actually, that is
          easy, let me just do it.&rdquo; The back-and-forth should feel
          collaborative, not adversarial.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light font-medium">
          3. &ldquo;Explain a technical decision you made recently and why it
          was the right call, but explain it to me like I am not an
          engineer.&rdquo;
        </p>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light mt-3">
          This is the one that separates great technical co-founders from
          merely good engineers. Building the product is only half the job.
          The other half is communicating what you are building, why, and what
          the tradeoffs are, in language your co-founder, your investors, and
          your customers can understand. If someone cannot explain their
          technical choices without jargon, you are going to spend a lot of
          time confused and a lot of meetings frustrated.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          The Bottom Line
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          The best technical co-founder for an early-stage startup is not the
          one with the most impressive resume or the deepest systems design
          knowledge. It is the one who ships. The one who understands that
          version one is a learning tool, not a monument. The one who makes
          fast decisions, communicates clearly, and trusts you to own the
          things you are better at.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          You are not looking for someone to build your product perfectly. You
          are looking for someone to build it <em>now</em>, and then make it
          better together, one iteration at a time.
        </p>
      </FadeIn>
    </article>
  );
}
