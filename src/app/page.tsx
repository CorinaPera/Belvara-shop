import { getAllProducts } from "@/lib/products";
import { AddToCart } from "@/components/cart/add-to-cart";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-eyebrow text-sm tracking-wide uppercase mb-2">
          Belvara
        </p>
        <h1 className="font-display text-4xl text-primary">
          Testare Cart UI + Bază de date
        </h1>
        <p className="text-primary/60 mt-2 max-w-lg">
          Produsele de mai jos vin acum din PostgreSQL prin Prisma, nu din
          date statice. Va fi înlocuită de homepage-ul final generat anterior.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <p className="text-primary/70 mb-2">
            Niciun produs găsit în baza de date.
          </p>
          <p className="text-sm text-primary/50">
            Rulează <code className="bg-primary/10 px-1.5 py-0.5 rounded">npm run db:seed</code> pentru
            a popula catalogul demo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div
                className="wood-slat-placeholder aspect-square rounded-lg mb-4"
                role="img"
                aria-label={product.imageAlt}
              />
              <p className="text-eyebrow text-xs uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <h2 className="font-display text-lg text-primary mb-1">
                {product.name}
              </h2>
              <p className="text-sm text-primary/60 mb-4">
                {product.shortDescription}
              </p>
              <div className="mt-auto">
                <AddToCart product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
