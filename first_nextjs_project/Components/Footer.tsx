import React from "react";

function Footer({ font }: { font: string }) {
  return (
    <>
      <footer className="py-12 bg-gray-500 text-gray-500">
        <div
          className={`max-w-[100rem] px-12 mx-auto flex justify-between ${font}`}
        >
          <p className="text-xl">Sahil</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
