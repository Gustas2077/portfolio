interface Card {
  img: string;
  title: string;
  description: string;
}

const Cards: Card[] = [
  {
    title: "Card title",
    description: "Card description",
    img: "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg",
  },
  {
    title: "Card title",
    description: "Card description",
    img: "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg",
  },
  {
    title: "Card title",
    description: "Card description",
    img: "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg",
  },
  {
    title: "Card title",
    description: "Card description",
    img: "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg",
  },
  {
    title: "Card title",
    description: "Card description",
    img: "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg",
  },
  {
    title: "Card title",
    description: "Card description",
    img: "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg",
  },
];

function Card({ title, description, img }: Card) {
  return (
    <div className="block rounded-lg bg-white dark:bg-neutral-700">
      <img className="rounded-t-lg" src={img} alt="" />
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 max-sm:text-sm">
          {title}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 max-sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Blender() {
  return (
    <>
      <main className="min-h-full">
        <div className="relative flex justify-center items-center w-full my-12">
          <span className="bg-clip-text text-transparent text-center uppercase text-5xl font-extrabold px-10 linear-wipe">
            Blender
          </span>
        </div>
        <section className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:max-w-xl md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl">
          {Cards.map(({ title, description, img }) => (
            <Card title={title} description={description} img={img} />
          ))}
        </section>
      </main>
    </>
  );
}
