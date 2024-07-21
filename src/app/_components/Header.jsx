import Image from "next/Image";
import SearchIcon from "../../../public/images/search-icon.png";
import CartIcon from "../../../public/images/cart-icon.png";
import LeftArrow from "../../../public/images/left-arrow.png";
import RightArrow from "../../../public/images/right-arrow.png";
import LogoutButton from "./LogoutButton";


const Header = ({userName}) => {
  const navItems = [
    "Categories",
    "Sales",
    "Clearence",
    "New Stock",
    "Trending",
  ];
  return (
    <div>
      <div className="mx-8 my-4 flex flex-col gap-[1rem]">
        <div className="flex justify-end gap-[1rem] text-sm items-center">
          <div className="cursor-pointer hidden sm:block">Help</div>
          <div className="cursor-pointer hidden sm:block">Orders & Returns</div>
          {userName && (
            <div className="flex gap-4 items-center">
            <div className="cursor-pointer">Hi, {userName}</div>
            <LogoutButton />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold">ECOMMERCE</h1>
          <div className="hidden md:flex gap-6 text-sm font-bold ">
            {navItems.map((item, id) => (
              <div className="cursor-pointer" key={id}>
                {item}
              </div>
            ))}
          </div>
          <div className="flex gap-6">
            <div className="cursor-pointer">
              <Image alt='icon' className="h-4 w-4" src={SearchIcon} />
            </div>
            <div className="cursor-pointer">
              <Image alt='icon' className="h-4 w-4" src={CartIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-lightGray flex justify-center py-2 items-center gap-4">
      <div className="cursor-pointer">
              <Image alt='icon' className="h-4 w-4" src={LeftArrow} />
            </div>
        <div className="text-sm">Get 10% off on business sign up</div>
        <div className="cursor-pointer">
              <Image alt='icon' className="h-4 w-4" src={RightArrow} />
            </div>
      </div>
    </div>
  );
};

export default Header;
