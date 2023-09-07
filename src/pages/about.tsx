export function About() {
  return (
    <>
      <main className="flex flex-col gap-4">
        <div className="flex justify-center items-center">
          <img
            className="h-96 w-96 rounded-full object-cover object-center max-xl:h-64 max-xl:w-64 max-sm:h-48 max-sm:w-48 shadow-xl hover:shadow-green-700 ease-in duration-100"
            src="https://hative.com/wp-content/uploads/2023/06/default-pfp-with-hat/8-default-pfp-with-hat.jpg"
            alt="pfp image"
          />
        </div>
        <div className="relative flex justify-center items-center w-full">
          <span className="linear-wipe font-extrabold">
            My name is Gustas, But you can call me Gus...
          </span>
        </div>
      </main>
    </>
  );
}
