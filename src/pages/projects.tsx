import { useQuery } from "react-query";
import { getProject, type Card } from "../utils";

function Card({ title, description, image, url }: Card) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg object-cover h-96 w-96"
          src={image}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <a
          href={url} download
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View Project
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const { data, isLoading } = useQuery("code", getProject);

  if (data)
    return (
      <>
        <main className="min-h-full">
          <div className="relative flex justify-center items-center w-full my-12">
            <span className="bg-clip-text text-transparent text-center uppercase text-5xl font-extrabold px-10 linear-wipe">
              Project
            </span>
          </div>
          <section className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:max-w-xl md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl">
            {data.data.map((card) => (
              <Card {...card} />
            ))}
          </section>
        </main>
      </>
    );

  if (isLoading)
    return (
      <>
        <main className="hero relative w-full flex flex-col justify-center items-center gap-6 text-justify max-sm:text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="animate-spin w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </main>
      </>
    );
}
