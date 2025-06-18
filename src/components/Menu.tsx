import "../app/globals.css";
import React, { useEffect, useState } from "react";
import Category from "@/types/Category";
import axios from "axios";

interface Props {
  onItemSelect(id: number): number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Menu: React.FC<Props> = ({ onItemSelect }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  function SetActive(id: number) {
    setActiveCategory(id);
    onItemSelect(id);
    console.log(categories);
  }

  useEffect(() => {
    axios
      .get<Category[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories?limit=0`
      )
      .then(({ data }) => {
        setCategories(data);
      });
  }, []);

  return (
    <>
      <div className="menu-row sm:items-start">
        {categories.map((c, index) => (
          <span
            className={classNames(
              c.id === activeCategory
                ? "menu-item bg-gray-900 text-white"
                : "menu-item text-gray-300 hover:bg-gray-700 hover:text-white",
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
            onClick={() => {
              SetActive(c.id);
            }}
            key={index}
          >
            {c.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default Menu;
