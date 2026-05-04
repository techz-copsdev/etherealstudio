import Link from "next/link";

interface Category {
  slug: string;
  name: string;
  image: string;
}

interface Props {
  categories: Category[];
}

export function CategoryGrid({ categories }: Props) {
  return (
    <div className="cat-grid">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/?category=${c.slug}#produk`}
          className="cat-item"
        >
          <div className="cat-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={c.name} loading="lazy" />
          </div>
          <span className="cat-name">{c.name}</span>
        </Link>
      ))}
    </div>
  );
}
