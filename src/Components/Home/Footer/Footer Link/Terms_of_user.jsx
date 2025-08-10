import React from "react";

export default function TermsOfUse() {
  const items = [
    {
      title: "Use of Service",
      body:
        "You may use this platform only for lawful purposes and in accordance with these terms.",
    },
    {
      title: "Content",
      body:
        "You are responsible for the accuracy of any information you submit regarding lost or found items.",
    },
    {
      title: "Privacy",
      body:
        "Do not share personal or sensitive information publicly. We are not responsible for any misuse of information posted by users.",
    },
    {
      title: "Prohibited Activities",
      body:
        "Do not post false, misleading, or fraudulent information.",
    },
    {
      title: "Changes to Terms",
      body:
        "We reserve the right to update these terms at any time.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* Header */}
      <section className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-10 sm:pt-20 sm:pb-12">
          <div className="flex flex-col gap-4 sm:gap-6">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Terms of Use
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Welcome to our Lost and Found platform. By accessing or using our
              services, you agree to comply with and be bound by the following
              terms.
            </p>
            <div className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sticky Sidebar */}
          <aside className="order-last lg:order-first lg:sticky lg:top-6 h-max rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
            <h2 className="text-sm font-semibold text-slate-700">On this page</h2>
            <nav className="mt-4 space-y-2 text-sm">
              <a href="#overview" className="block rounded-md px-2 py-1 hover:bg-slate-50">Overview</a>
              {items.map((it, i) => (
                <a
                  key={i}
                  href={`#item-${i}`}
                  className="block rounded-md px-2 py-1 hover:bg-slate-50"
                >
                  {it.title}
                </a>
              ))}
              <a href="#acceptance" className="block rounded-md px-2 py-1 hover:bg-slate-50">Acceptance</a>
            </nav>
          </aside>

          {/* Main Card */}
          <article className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <section id="overview" className="prose prose-slate max-w-none">
                <h2>Overview</h2>
                <p>
                  If you do not agree to these terms, please do not use our
                  services.
                </p>
              </section>

              <div className="mt-8 divide-y divide-slate-200">
                {items.map((it, i) => (
                  <section key={i} id={`item-${i}`} className="py-6 first:pt-0">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <span className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13 4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">{it.title}</h3>
                        <p className="mt-1 text-slate-600">{it.body}</p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <section id="acceptance" className="mt-6 rounded-xl bg-slate-50 p-5">
                <h3 className="text-lg font-semibold">Acceptance of Terms</h3>
                <p className="mt-1 text-slate-600">
                  By continuing to use the platform, you acknowledge that you
                  have read and agree to these Terms of Use.
                </p>
              </section>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="/"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 sm:w-auto"
                >
                  Go Back Home
                </a>
                <p className="text-xs leading-relaxed text-slate-500">
                  This Terms of Use page is provided for informational purposes and does not constitute legal advice.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
