import * as React from "react";

/**
 * Generated website mockups. Everything here is real DOM + CSS, so the
 * "screenshots" stay razor sharp on retina screens and cost nothing to load.
 * Each page is drawn on a fixed 1120×700 canvas and scaled to fit.
 */

/* ---------------------------------- CAFE --------------------------------- */

export function CafeMock() {
  return (
    <div className="relative h-[700px] w-[1120px] overflow-hidden bg-[#fdf6ee] font-sans text-[#2a1d14]">
      <div className="absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,#ffd9b8,transparent_62%)]" />
      <div className="absolute -left-24 bottom-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#ffe9d2,transparent_65%)]" />

      <div className="relative flex items-center justify-between px-14 py-7">
        <p className="font-display text-[20px] font-semibold tracking-[-0.03em]">
          Kapé<span className="text-[#4CAF50]"> Dabaw</span>
        </p>
        <div className="flex items-center gap-9 text-[13px] font-semibold text-[#6d5748]">
          <span>Menu</span>
          <span>Our beans</span>
          <span>Find us</span>
          <span className="rounded-full bg-[#2a1d14] px-5 py-2.5 text-white">Order online</span>
        </div>
      </div>

      <div className="relative grid grid-cols-[0.95fr_1.05fr] items-center gap-8 px-14 pt-8">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ffe3c9] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a2521b]">
            Roasted in Davao
          </p>
          <h1 className="font-display text-[64px] font-semibold leading-[0.96] tracking-[-0.04em]">
            Salted caramel,
            <br />
            brewed in
            <br />
            <span className="text-[#4CAF50]">Davao.</span>
          </h1>
          <p className="mt-6 max-w-[390px] text-[15px] leading-relaxed text-[#6d5748]">
            Single-origin Bukidnon beans, pulled fresh every morning on Bolton Street.
            Open 7AM for the early crowd.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="rounded-full bg-[#4CAF50] px-6 py-3 text-[14px] font-bold text-white shadow-[0_16px_34px_-16px_rgba(76,175,80,0.95)]">
              Order for pickup
            </span>
            <span className="text-[14px] font-semibold text-[#2a1d14] underline decoration-[#4CAF50] decoration-2 underline-offset-4">
              See the menu
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative h-[400px] w-[470px] overflow-hidden rounded-[30px] bg-[#4CAF50] shadow-[0_44px_90px_-44px_rgba(120,60,20,0.6)]">
            <div className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3a2418]/85" />
            <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-[62%] rounded-full bg-[#f6e3d2]" />
            <div className="absolute left-1/2 top-[62%] h-16 w-40 -translate-x-1/2 rounded-b-[40px] bg-[#2a1d14]/70" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(60,30,10,0.45),transparent_70%)]" />
          </div>
          <div className="absolute -left-6 top-8 rounded-2xl border border-[#f0dfcd] bg-white p-4 shadow-[0_24px_50px_-28px_rgba(80,40,10,0.5)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#a2521b]">
              Today's special
            </p>
            <p className="mt-1 text-[17px] font-bold tracking-[-0.02em]">Caramel Macchiato</p>
            <p className="text-[13px] font-semibold text-[#6d5748]">₱165 · large</p>
          </div>
          <div className="absolute -right-2 bottom-4 rounded-2xl border border-[#f0dfcd] bg-white px-4 py-3 shadow-[0_24px_50px_-28px_rgba(80,40,10,0.5)]">
            <p className="text-[13px] font-bold">Open 7AM – 7PM</p>
            <p className="text-[11px] text-[#6d5748]">Bolton Street</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-10 border-t border-[#f0dfcd] bg-white/70 px-14 py-6 backdrop-blur">
        <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[#a2521b]">
          Fan favourites
        </p>
        {[
          ["Flat white", "₱140"],
          ["Spanish latte", "₱175"],
          ["Durian cheesecake", "₱195"],
        ].map(([name, price]) => (
          <div key={name} className="flex items-baseline gap-2">
            <p className="text-[13px] font-semibold text-[#2a1d14]">{name}</p>
            <p className="text-[13px] text-[#8b7563]">{price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- WORKSHOP ------------------------------- */

export function WorkshopMock() {
  return (
    <div className="relative h-[700px] w-[1120px] overflow-hidden bg-[#101725] font-sans text-white">
      <div className="absolute inset-0 bg-grid-sm opacity-30" />
      <div className="absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(76,175,80,0.22),transparent_64%)]" />
      <div className="absolute -left-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(23,190,187,0.1),transparent_66%)]" />

      <div className="relative flex items-center justify-between px-14 py-7">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-[#4CAF50] font-display text-[15px] font-bold text-[#101725]">
            M
          </div>
          <div>
            <p className="text-[16px] font-bold tracking-[-0.02em]">Mindanao Metal Works</p>
            <p className="text-[11px] text-white/45">Bunawan · since 2006</p>
          </div>
        </div>
        <div className="flex items-center gap-8 text-[13px] font-medium text-white/65">
          <span>Capabilities</span>
          <span>Projects</span>
          <span>Machines</span>
          <span className="rounded-full bg-[#4CAF50] px-5 py-2.5 font-semibold text-[#101725]">
            Get a quote
          </span>
        </div>
      </div>

      <div className="relative grid grid-cols-[0.9fr_1.1fr] gap-10 px-14 pt-10">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            <span className="size-1.5 rounded-full bg-[#4CAF50]" />
            Serving all of Mindanao
          </p>
          <h1 className="font-display text-[54px] font-semibold leading-[0.98] tracking-[-0.04em]">
            Precision fabrication
            <span className="block text-[#4CAF50]">& machining.</span>
          </h1>
          <p className="mt-6 max-w-[400px] text-[15px] leading-relaxed text-white/55">
            CNC parts, stainless railings and custom equipment built to spec. Send a drawing,
            get a quote the same day.
          </p>
          <div className="mt-8 flex gap-3">
            <span className="rounded-full bg-white px-6 py-3 text-[14px] font-bold text-[#101725]">
              Upload a drawing
            </span>
            <span className="rounded-full border border-white/18 px-6 py-3 text-[14px] font-semibold text-white/85">
              Call the shop
            </span>
          </div>
          <div className="mt-10 flex gap-10">
            {[
              ["One shop", "rubber + metal"],
              ["To spec", "from your drawing"],
              ["Fast", "same-day quotes"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-[26px] font-semibold tracking-[-0.03em]">{value}</p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "CNC machined parts", tone: "bg-[#24536e]" },
            { label: "Stainless railing", tone: "bg-[#6b4a30]" },
            { label: "Food-grade equipment", tone: "bg-[#37335f]" },
            { label: "Plant maintenance", tone: "bg-white/10" },
          ].map((tile, index) => (
            <div
              key={tile.label}
              className={`relative overflow-hidden rounded-2xl border border-white/10 ${tile.tone} ${
                index === 0 ? "row-span-2 h-[392px]" : "h-[188px]"
              }`}
            >
              <div className="absolute inset-0 bg-grid-sm opacity-25" />
              <p className="absolute inset-x-4 bottom-4 text-[13px] font-semibold text-white">
                {tile.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ MOBILE SCREEN ---------------------------- */

/** 390×844 phone screen — proves the "looks right on mobile" claim. */
export function MobileScreenMock() {
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-[#fdf6ee] font-sans text-[#2a1d14]">
      <div className="flex items-center justify-between px-6 pb-2 pt-5 text-[12px] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-1 text-[11px]">
          <span className="h-2 w-3.5 rounded-sm bg-[#2a1d14]/70" />
          <span className="h-2 w-5 rounded-sm bg-[#2a1d14]/40" />
        </span>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <p className="font-display text-[19px] font-semibold tracking-[-0.03em]">
          Kapé<span className="text-[#4CAF50]"> Dabaw</span>
        </p>
        <span className="flex flex-col gap-1">
          <span className="h-0.5 w-5 rounded-full bg-[#2a1d14]/70" />
          <span className="h-0.5 w-5 rounded-full bg-[#2a1d14]/70" />
        </span>
      </div>

      <div className="relative mx-5 mt-3 h-[280px] overflow-hidden rounded-3xl bg-[#4CAF50]">
        <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3a2418]/85" />
        <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-[62%] rounded-full bg-[#f6e3d2]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(ellipse_at_bottom,rgba(60,30,10,0.5),transparent_70%)]" />
      </div>

      <div className="px-6 pt-6">
        <h2 className="font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.035em]">
          Salted caramel, brewed in <span className="text-[#4CAF50]">Davao.</span>
        </h2>
        <p className="mt-4 text-[13.5px] leading-relaxed text-[#6d5748]">
          Open 7AM on Bolton Street. Order for pickup in two taps.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <span className="rounded-full bg-[#4CAF50] px-5 py-3.5 text-center text-[14px] font-bold text-white">
            Order for pickup
          </span>
          <span className="rounded-full border border-[#e2cfba] px-5 py-3.5 text-center text-[14px] font-semibold">
            See the menu
          </span>
        </div>
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-[#f0dfcd] bg-white px-4 py-3">
          <span className="text-[16px] text-[#4CAF50]">★</span>
          <p className="text-[12px] font-semibold">Open 7AM – 7PM · Bolton St</p>
        </div>
      </div>
    </div>
  );
}

export const mockPages = {
  cafe: CafeMock,
  workshop: WorkshopMock,
} as const;
