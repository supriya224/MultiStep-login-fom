import React from 'react';

function Header() {
  return (
    <header className="w-full">
      <div className="flex justify-between shadow-lg items-center">
        <img
          width={50}
          height={40}
          className="ml-32"
          src="https://www.guruji.life/wp-content/uploads/2022/08/Guruji-Logo-1.png"
          alt=""
        />
        <h3 className="pr-32">MultiStep form</h3>
      </div>
    </header>
  );
}

export default Header;
