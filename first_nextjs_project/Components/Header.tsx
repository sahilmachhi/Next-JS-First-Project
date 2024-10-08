import Link from "next/link";

function Header() {
  return (
    <>
      <header className="py-2 bg-gray-500">
        <div className="max-w-[100rem] px-12 mx-auto flex justify-between">
          <Link href="/">
            <h1 className={`uppercase text-yellow-500 text-center py-2 `}>
              Easy Sell
            </h1>
          </Link>
          <Link
            href="/form"
            className="uppercase text-green-500 text-xl py-2 hover:text-yellow-700"
          >
            Upload {">"}
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
