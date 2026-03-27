"use client";

import FadeIn from "./FadeIn";

export default function BlogContent_McpGroundsLlms() {
  return (
    <article className="space-y-6">
      <FadeIn>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light border-l-2 border-border-light pl-4">
          Hallucinations are the most embarrassing thing an AI can do, and the
          most dangerous. Here&apos;s the architectural pattern that makes them
          structurally impossible for anything the AI is supposed to know.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          A few weeks ago I was explaining MCP to my friend, who&apos;s an AI
          compliance attorney. She works with companies using AI tools for
          hiring, and her whole job is asking hard questions: what data
          does the system access, through what channels, with what controls?
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          When I walked her through how the{" "}
          <a
            href="https://github.com/Mahender22/legal-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-rivet transition-colors"
          >
            LegalMCP server
          </a>{" "}
          works, something clicked. Not just as a neat demo - but as an
          actual answer to the compliance questions she fields every day. That
          conversation turned into a one-pager, and now it&apos;s this post,
          because I think the framing is useful for any builder thinking
          seriously about reliable AI.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          The hallucination problem isn&apos;t about intelligence
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Here&apos;s the thing people get wrong about LLM hallucinations: they
          treat it like a quality problem that will get fixed with smarter
          models. It&apos;s not. It&apos;s a structural problem that stems from
          what an LLM fundamentally is.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Claude (or GPT, or any other model) is trained on a massive dataset
          with a cutoff date. It knows a lot - but it knows none of your
          private data, nothing that happened after training ended, and nothing
          that&apos;s specific to your systems. When you ask it about something
          in that gap, it doesn&apos;t say &ldquo;I don&apos;t know.&rdquo; It
          generates a plausible-sounding answer, because that&apos;s what
          it&apos;s optimized to do.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Ask a base LLM &ldquo;what was the ruling in{" "}
          <em>Johnson v. XYZ Corp</em>?&rdquo; and it might give you a
          confident, well-cited, completely fabricated answer. Not because
          it&apos;s broken - because it&apos;s doing exactly what it was
          built to do, just without the actual data it needs.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-background-secondary border border-border-light rounded-xl px-6 py-5 my-2">
          <p className="text-[0.95rem] leading-[1.8] text-foreground m-0">
            <strong className="font-medium">
              The fix isn&apos;t making the model smarter.
            </strong>{" "}
            It&apos;s giving the model a structured way to reach actual data
            sources, so it never has to guess in the first place. That&apos;s
            what MCP does.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          MCP: the door out of the sealed room
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Think of an AI assistant as a brilliant associate locked in a room
          with no internet, no access to your databases, and no window to the
          outside world. It can only work with what you hand it directly. MCP
          - the Model Context Protocol, an open standard created by
          Anthropic - is the door.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          But it&apos;s not an open door. It&apos;s a very specific door that
          only leads to specific places. Someone (a developer, your firm, a
          vendor) builds an MCP server that exposes a defined set of tools. The
          AI can call those tools. That&apos;s it. It can&apos;t go anywhere
          else, access anything else, or reach beyond what the server explicitly
          allows.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-stretch gap-0 my-6">
          <div className="flex-1 min-w-[120px] bg-background border border-border-light rounded-lg px-4 py-3 text-center">
            <div className="text-xs text-foreground-light mb-1">AI assistant</div>
            <div className="text-[13px] font-medium text-foreground">Claude, GPT, etc.</div>
          </div>
          <div className="flex items-center px-3 text-foreground-light text-sm flex-shrink-0">
            &rarr; tool calls &rarr;
          </div>
          <div className="flex-1 min-w-[120px] bg-background border border-border-light rounded-lg px-4 py-3 text-center">
            <div className="text-xs text-foreground-light mb-1">MCP server</div>
            <div className="text-[13px] font-medium text-foreground">runs locally</div>
          </div>
          <div className="flex items-center px-3 text-foreground-light text-sm flex-shrink-0">
            &rarr; API requests &rarr;
          </div>
          <div className="flex-1 min-w-[120px] bg-background border border-border-light rounded-lg px-4 py-3 text-center">
            <div className="text-xs text-foreground-light mb-1">real data sources</div>
            <div className="text-[13px] font-medium text-foreground">CourtListener, Clio, PACER</div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          This architecture matters because it turns hallucinations from a
          probabilistic risk into a structural impossibility - at least
          for anything in scope. If the data is supposed to come from a real
          source, it will. The model can&apos;t fabricate what it&apos;s
          configured to look up.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          A concrete example: legal research
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          <a
            href="https://github.com/Mahender22/legal-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-rivet transition-colors"
          >
            LegalMCP
          </a>{" "}
          is an open-source MCP server that gives an AI assistant
          access to 18 specific tools across three domains. It&apos;s a clean
          illustration of the pattern because the stakes are high -
          fabricated case citations are a real and serious problem in legal AI.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px] border-collapse my-2">
            <thead>
              <tr>
                <th className="text-left font-medium text-[12px] text-foreground-light border-b border-border-light pb-2 pr-4 uppercase tracking-wide">
                  Domain
                </th>
                <th className="text-left font-medium text-[12px] text-foreground-light border-b border-border-light pb-2 pr-4 uppercase tracking-wide">
                  What the AI can do
                </th>
                <th className="text-left font-medium text-[12px] text-foreground-light border-b border-border-light pb-2 pr-4 uppercase tracking-wide">
                  Data source
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 pr-4 align-top border-b border-border-light/50 text-foreground leading-relaxed">
                  Case law research
                </td>
                <td className="py-3 pr-4 align-top border-b border-border-light/50 text-foreground leading-relaxed">
                  Search 4M+ court opinions, pull full text, trace citation
                  chains, parse Bluebook citations
                </td>
                <td className="py-3 pr-4 align-top border-b border-border-light/50 text-foreground-light text-[13px] leading-relaxed">
                  CourtListener
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top border-b border-border-light/50 text-foreground leading-relaxed">
                  Practice management
                </td>
                <td className="py-3 pr-4 align-top border-b border-border-light/50 text-foreground leading-relaxed">
                  Search clients, pull billing and time entries, check
                  deadlines, retrieve matter documents
                </td>
                <td className="py-3 pr-4 align-top border-b border-border-light/50 text-foreground-light text-[13px] leading-relaxed">
                  Clio
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top text-foreground leading-relaxed">
                  Federal filings
                </td>
                <td className="py-3 pr-4 align-top text-foreground leading-relaxed">
                  Query federal cases, docket entries, and court filings
                </td>
                <td className="py-3 pr-4 align-top text-foreground-light text-[13px] leading-relaxed">
                  PACER
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          When you ask &ldquo;find Supreme Court cases about Fourth Amendment
          cell phone location data,&rdquo; the model doesn&apos;t search the
          internet or reach into training data. It calls the{" "}
          <code className="font-mono text-[13px] bg-background-secondary border border-border-light rounded px-[5px] py-[1px]">
            search_case_law
          </code>{" "}
          tool, which hits CourtListener&apos;s database and returns real
          results - like <em>Carpenter v. United States</em>, 585 U.S.
          296 (2018) - with actual citations and links to the full
          opinion. No guessing. No fabricating. The data is either there or it
          isn&apos;t.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          The MCP server runs locally. Your Clio credentials, client names, and
          billing records travel directly between the local server and the Clio
          API - they don&apos;t route through Anthropic, through any
          third-party inference provider, or through anything you didn&apos;t
          explicitly configure.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          Why this is an engineering answer, not just a safety answer
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          The compliance framing is important - and I&apos;ll get to it
          - but I want to make the engineering case first, because I think
          builders sometimes treat hallucination mitigation as a compliance tax
          rather than a product quality win.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Grounding your AI in real data sources via MCP does several things
          that make your product genuinely better:
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
          <div className="bg-background border border-border-light/60 rounded-xl px-5 py-4">
            <div className="text-[13px] font-medium text-foreground mb-2">
              Deterministic accuracy
            </div>
            <p className="text-[13px] leading-relaxed text-foreground-light m-0">
              For anything in scope, the answer comes from the actual data. You
              can verify it. You can trace it back to the source. That&apos;s
              not something you can say about ungrounded LLM output.
            </p>
          </div>
          <div className="bg-background border border-border-light/60 rounded-xl px-5 py-4">
            <div className="text-[13px] font-medium text-foreground mb-2">
              Scoped surface area
            </div>
            <p className="text-[13px] leading-relaxed text-foreground-light m-0">
              The AI can only do the things the server defines. This is a
              feature, not a limitation - it means you can reason about
              what the system will and won&apos;t do.
            </p>
          </div>
          <div className="bg-background border border-border-light/60 rounded-xl px-5 py-4">
            <div className="text-[13px] font-medium text-foreground mb-2">
              Auditability by default
            </div>
            <p className="text-[13px] leading-relaxed text-foreground-light m-0">
              Every tool call is a discrete event with defined inputs and
              outputs. You get a paper trail without building one. That&apos;s
              useful for debugging, for compliance, and for explaining AI
              behavior to stakeholders.
            </p>
          </div>
          <div className="bg-background border border-border-light/60 rounded-xl px-5 py-4">
            <div className="text-[13px] font-medium text-foreground mb-2">
              Human stays in the loop
            </div>
            <p className="text-[13px] leading-relaxed text-foreground-light m-0">
              MCP fetches information; it doesn&apos;t make decisions. The AI
              surfaces the relevant case. You decide whether it applies. That
              distinction matters more than most people think when you&apos;re
              dealing with high-stakes domains.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          The compliance frame
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Here&apos;s the question my friend asks companies building AI tools:
          &ldquo;What data does the system access, through what channels, with
          what controls?&rdquo; For most AI products, that question doesn&apos;t
          have a clean answer. The model was trained on something, it might be
          pulling from an API somewhere, and the boundaries are fuzzy.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          MCP is the architectural answer to that question. An AI system built
          on MCP has a legible surface area - you can enumerate exactly
          what it can access, how, and under what conditions. One without it is,
          in her words, &ldquo;a black box reaching into unknown data sources
          with no paper trail.&rdquo;
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          For any sector where AI is touching sensitive data - legal,
          healthcare, HR, finance - that legibility isn&apos;t just nice
          to have. It&apos;s increasingly the baseline regulators expect.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <hr className="border-none border-t border-border-light my-8" />
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          We build AI-powered products at Riveted, and MCP is increasingly a
          first-class part of how we architect integrations for clients. If
          you&apos;re building something where your AI needs to know things that
          are true right now - not things that were true when the model
          was trained - let&apos;s talk about how to wire it up correctly
          from the start.
        </p>
      </FadeIn>
    </article>
  );
}
