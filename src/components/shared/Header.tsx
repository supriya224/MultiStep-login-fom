import React from 'react';

function Header() {
  return (
    <header className="w-full">
      <div className=" container mx-auto pb-2 flex gap-3 justify-between border-b items-center">
        <img
          width={50}
          height={40}
          className=""
          loading="lazy"
          src="https://www.guruji.life/wp-content/uploads/2022/08/Guruji-Logo-1.png"
          alt=""
        />
        <h3 className="">Multistep form</h3>
      </div>
    </header>
  );
}

export default Header;
