"use client";

import FadeIn from "./FadeIn";

export default function BlogContent_ApiFirstWorkflow() {
  return (
    <article className="space-y-6">
      <FadeIn>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          If you have ever built a feature that touches both the frontend and
          the backend, you know the dance. Someone writes a spec. Someone else
          drafts a JSON schema. A third person builds a mock API so the
          frontend team can start work. And then, inevitably, the real API
          ships with slightly different field names, a nested object where the
          mock had a flat one, and a status code nobody accounted for. The
          frontend breaks. Fingers get pointed. Meetings get scheduled.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          There is a better way, and it is surprisingly simple: start every
          fullstack feature from the backend API. Design the endpoints, write
          the route handlers, define the request and response shapes in actual
          code. Then build the frontend to match what already exists and works.
          No coordination documents. No schema files to keep in sync. The API
          is the contract, and it is always up to date because it is the
          running code.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          Why Backend First?
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Most fullstack coordination problems boil down to one thing: the
          frontend and backend disagree on the shape of the data. Maybe the
          field is called <code className="bg-background-alt px-1.5 py-0.5 rounded text-sm font-mono">user_id</code> on
          the backend and <code className="bg-background-alt px-1.5 py-0.5 rounded text-sm font-mono">userId</code> on
          the frontend. Maybe the API returns a list where the UI expected a
          single object. These mismatches are small individually, but they
          compound into hours of debugging and back-and-forth.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          When you build the API first, you make these decisions once. The
          route handler file becomes the single source of truth. The frontend
          developer (even if that is also you) can open the router file, read
          the endpoint definitions, and know exactly what to send and what to
          expect back. No Slack messages asking "hey, what does the response
          look like for this endpoint?" The answer is right there in the code.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          Router Files as Living Documentation
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Here is the part that makes this workflow click. In most modern
          backend frameworks, your route handler files already contain
          everything a frontend developer needs to know. The URL paths. The
          HTTP methods. The request validation rules. The response structures.
          The error codes. It is all there, expressed in actual executable
          code rather than a PDF that someone forgot to update three sprints
          ago.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Think about what this replaces. Teams typically maintain one or more
          of the following: OpenAPI spec files, Postman collections, Notion
          pages with endpoint tables, markdown files in the repo, or (my
          personal favorite) a Slack thread from four months ago where someone
          pasted a curl command. All of these go stale. All of them require
          someone to remember to update them. The router file never goes stale
          because if it is wrong, the feature does not work.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-[#1a1a1a] text-[#e0e0e0] p-5 rounded-lg overflow-x-auto text-sm font-mono my-6">
          <pre>{`# Instead of maintaining a separate API spec, the router IS the spec.
# A frontend developer can read this file and know exactly how to
# call the endpoint, what to send, and what they will get back.

@router.post("/permissions")
async def set_permissions(
    request: PermissionUpdateRequest,  # <- the shape of the request body
    current_user: User = Depends(get_current_user),
) -> PermissionResponse:              # <- the shape of the response
    ...`}</pre>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          When you hand a frontend developer that file, they do not need to
          guess. They do not need to wait for an API doc update. They open
          the router, see the type definitions, and start building. If the
          backend developer changes something, the router file changes too,
          and the frontend developer can see exactly what shifted.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          A Real Workflow Example
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Let me walk through how this plays out in practice. Say you are
          building a permissions management feature. Managers need to control
          what actions each team member can take. This touches the backend
          (permission checks, storage, API endpoints) and the frontend (a UI
          for viewing and editing permissions).
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light font-medium">
          Step 1: Build the backend API and implementation.
        </p>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Write the route handlers for creating, reading, updating, and
          deleting permissions. Define the data models. Write the business
          logic. Test it. At this point, you have a working API that does
          real things. Not a mock. Not a stub. The real deal.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light font-medium">
          Step 2: Build the frontend by reading the backend.
        </p>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Now open the router file alongside your frontend code. You can see
          every endpoint, every request shape, every response. Build your API
          client layer to match. Then build the UI on top of that. If you are
          using AI coding tools, you can point them at the router file and
          say "build a UI that consumes these endpoints." The router file
          gives the tool (and you) all the context it needs.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light font-medium">
          Step 3: Ship it.
        </p>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Because the frontend was built against the actual API, not a spec
          that might be out of date, integration issues are rare. The first
          time the frontend calls the backend, it usually just works. That is
          not a small thing. In traditional workflows, the integration phase
          is where projects go sideways. Eliminating most of that friction is
          a genuine time saver.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          The Peer Repository Trick
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          One thing that makes this workflow especially smooth is keeping your
          frontend and backend repos as peers in your local directory
          structure. Something like this:
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-[#1a1a1a] text-[#e0e0e0] p-5 rounded-lg overflow-x-auto text-sm font-mono my-6">
          <pre>{`~/projects/
  ├── my-app-frontend/    # Next.js, React, etc.
  └── my-app-backend/     # FastAPI, Django, Express, etc.`}</pre>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          This is not a monorepo. You do not need shared build tools or a
          complex workspace configuration. Each repo is fully independent.
          But because they sit side by side on your filesystem, you (and your
          tools) can reference files across repos effortlessly. Your editor
          can have both open. Your AI assistant can read the backend router
          while generating frontend code. You get the benefits of proximity
          without any of the monorepo overhead.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          The practical upshot: when you start a new feature, check out a
          feature branch on the backend, build the API, then switch to the
          frontend and build the UI against it. The backend branch is your
          reference material. You do not need to generate documentation from
          it or export schemas. You just read the code. If you have Figma
          designs for the UI, great, use them for the visual layer. But the
          data layer and API integration come straight from reading the
          backend source.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          What This Actually Eliminates
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Let me be specific about the overhead this workflow cuts:
        </p>
        <ul className="space-y-3 mt-4 mb-2">
          <li className="text-[1.05rem] leading-[1.9] text-foreground-light pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-2 before:h-2 before:rounded-full before:bg-rivet/40">
            JSON schema files that need to be maintained and versioned
            separately from the code they describe.
          </li>
          <li className="text-[1.05rem] leading-[1.9] text-foreground-light pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-2 before:h-2 before:rounded-full before:bg-rivet/40">
            Markdown API docs that go stale the moment someone forgets to
            update them (which is always).
          </li>
          <li className="text-[1.05rem] leading-[1.9] text-foreground-light pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-2 before:h-2 before:rounded-full before:bg-rivet/40">
            Coordination meetings where frontend and backend engineers
            negotiate data shapes. The backend just picks a shape, implements
            it, and the frontend follows.
          </li>
          <li className="text-[1.05rem] leading-[1.9] text-foreground-light pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-2 before:h-2 before:rounded-full before:bg-rivet/40">
            Integration bugs caused by mismatches between a spec and the
            actual implementation.
          </li>
          <li className="text-[1.05rem] leading-[1.9] text-foreground-light pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-2 before:h-2 before:rounded-full before:bg-rivet/40">
            The "who changed the API without telling anyone" problem. Changes
            are visible in the code, and code review catches them.
          </li>
        </ul>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          None of these are revolutionary ideas on their own. But together,
          they add up to a workflow where you spend less time coordinating and
          more time building. For a solo developer or a small team, that
          difference can be the difference between shipping this week and
          shipping next month.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          Making It Work with AI Tools
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          Here is where this workflow gets a multiplier effect. AI coding
          assistants are very good at reading existing code and generating
          code that works with it. When your backend API is already built and
          the router files are sitting right there on the filesystem, you can
          point your AI tool at them and ask it to generate the frontend API
          layer, build UI components that consume the endpoints, or figure
          out where a new UI element should live based on the existing
          patterns.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          The AI does not need a markdown spec or a Postman collection. It
          can read the Python (or TypeScript, or Go) router file directly and
          understand the API surface. This is faster and more accurate than
          working from documentation, because the code is always the most
          current and complete description of what the API does.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          I have found that combining this peer-repo setup with an AI
          assistant that can see both codebases lets me skip the entire
          "write an API client" phase. I tell the assistant where the router
          file lives, describe what the UI should do, and it generates
          frontend code that calls the right endpoints with the right data
          shapes. First try. No iteration needed.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-foreground mt-10 mb-4 font-normal">
          The Bottom Line
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          If everything is backend API driven, the frontend becomes a much
          simpler problem. You are not guessing at data shapes. You are not
          maintaining coordination artifacts. You are not scheduling alignment
          meetings. You are reading code that works and building a UI on top
          of it. That is the whole process.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-[1.05rem] leading-[1.9] text-foreground-light">
          This is not a heavyweight methodology. There is no manifesto, no
          certification, no twelve-step onboarding process. It is a
          lightweight habit: build the API first, let the code be the
          documentation, keep your repos next to each other, and let your
          tools read across them. That is it. And once you try it, you will
          wonder why you ever did it any other way.
        </p>
      </FadeIn>
    </article>
  );
}
