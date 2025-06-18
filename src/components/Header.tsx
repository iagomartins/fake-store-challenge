import Image from "next/image";
import Menu from "./Menu";
import CartView from "./CartView";

interface Props {
  emitCategory(index: number): number;
}

const Header: React.FC<Props> = ({ emitCategory }) => {
  return (
    <>
      <div className="column items-center w-full">
        <div className="flex justify-between w-full px-6">
          <div className="flex items-center justify-items-center">
            <Image
              alt="Fake Store E-Commerce"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mr-6 h-10 w-auto"
              width={100}
              height={100}
            />
            Fake Store!!
          </div>
          <div className="text-adjustment"><CartView /></div>
        </div>
        <Menu onItemSelect={emitCategory} />
      </div>
    </>
  );
};

export default Header;
