import { MdArrowForward, MdOpenInNew, MdInventory, MdVerifiedUser, MdAutoAwesome, MdLocalShipping } from "react-icons/md";
import { SHOP_PRODUCTS } from "../../constants";

const shopUrl = "https://shop.aggdoors.com.au/collections/merlin-spare-parts";

export default function PartsShop() {
  return (
    <section id="parts-shop" className="section overflow-hidden bg-canvas">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[radial-gradient(circle_at_top_left,rgba(102,196,43,0.18),transparent_30%),linear-gradient(135deg,#FFFFFF_0%,#F7FBF3_52%,#FFF7F5_100%)] p-5 shadow-soft sm:p-8 lg:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <span className="eyebrow mb-4">
                <MdAutoAwesome size={14} /> AGG Doors online shop
              </span>
              <h2 className="h-section max-w-xl">
                Need the part, not the callout? Shop genuine Merlin spares.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                We hand-picked useful in-stock Merlin spare parts from the AGG Doors shop so DIY customers can order directly, while repair customers can see the components our technicians diagnose and fit every week.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: MdInventory, title: "Live shop", text: "Direct product links" },
                  { icon: MdLocalShipping, title: "Delivery", text: "Australia-wide shipping" },
                  { icon: MdVerifiedUser, title: "Advice", text: "Ask before you buy" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-line bg-white/85 p-4 shadow-card backdrop-blur">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand-deep">
                        <Icon size={21} />
                      </span>
                      <p className="mt-3 text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-xs text-muted">{item.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-nowrap sm:gap-2 xl:gap-3">
                <a href={shopUrl} target="_blank" rel="noreferrer" className="btn-primary shrink-0 whitespace-nowrap px-3 text-xs xl:px-4 xl:text-sm">
                  <span>View all Merlin spare parts</span> <MdOpenInNew className="shrink-0" size={15} />
                </a>
                <a href="#contact" className="btn-secondary shrink-0 whitespace-nowrap bg-white/90 px-3 text-xs xl:px-4 xl:text-sm">
                  Not sure what fits? Ask us
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[1.6rem] border border-line bg-white/85 p-3 shadow-card backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between px-2 pt-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-deep">Popular parts</p>
                  <p className="text-xs text-muted">Direct to shop</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {SHOP_PRODUCTS.slice(0, 4).map((product) => (
                    <a
                      key={product.id}
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid grid-cols-[86px_1fr] gap-3 rounded-2xl border border-line bg-surface p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-soft"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-line bg-white">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-24 w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                          loading="eager"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="rounded-full bg-brand-tint px-2 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-brand-deep">
                          {product.tag}
                        </span>
                        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-ink">
                          {product.title}
                        </h3>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="font-display text-lg font-bold text-brand-deep">{product.price}</span>
                          <MdArrowForward className="text-muted transition group-hover:translate-x-1 group-hover:text-brand-deep" size={16} />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SHOP_PRODUCTS.slice(4).map((product) => (
            <div key={product.id}>
              <a
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="card group flex h-full flex-col overflow-hidden p-0 hover:-translate-y-1 hover:border-brand/50 hover:shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-white">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-deep shadow-card">
                    {product.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold leading-snug text-ink">{product.title}</h3>
                    <span className="shrink-0 rounded-xl bg-brand-tint px-3 py-1 font-display text-sm font-bold text-brand-deep">
                      {product.price}
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
                    Fits: {product.compatibility}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">{product.note}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink transition group-hover:text-brand-deep">
                    Open product <MdOpenInNew size={15} />
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-5 text-sm text-muted shadow-card">
          Prices and availability are pulled from the AGG Doors Merlin spare parts collection at build time. If a part is critical for a repair, confirm compatibility with a technician before ordering.
        </div>
      </div>
    </section>
  );
}
