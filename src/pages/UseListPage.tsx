import CategoryContent from "@/components/CategoryContent";
import ToggleButton from "@/components/ui/ToggleButton";
import type { Category, Item } from "@/data/Types";
import { useState } from "react";

function UseListPage({ categories }: { categories: Category[] }) {
  const [category, setCategory] = useState(-1);
  const [marked, setMarked] = useState(
    JSON.parse(localStorage.getItem("markedList") || "[]") as number[]
  );

  const list = JSON.parse(localStorage.getItem("list") || "[]") as number[];

  const getCategory: () => Category = () => {
    if (category === -1) {
      const allItems: Item[] = categories.flatMap((category) =>
        category.items.filter((item) => list.includes(item.itemId))
      );

      return {
        categoryId: -1,
        categoryName: "Все категории",
        items: allItems,
        icon: "🛒",
      } as Category;
    }

    const cat = categories[category - 1];
    return {
      categoryName: cat.categoryName,
      items: cat.items.filter((item) => list.includes(item.itemId)),
      icon: cat.icon,
      categoryId: cat.categoryId,
    };
  };

  const handleMarked = (itemId: number) => {
    let result: number[] = [];
    if (marked.includes(itemId)) {
      result = marked.filter((item) => item !== itemId);
    } else {
      result = [...marked, itemId];
    }
    setMarked(result);
    localStorage.setItem("markedList", JSON.stringify(result));
  };

  if (list.length === 0)
    return (
      <div className="h-1 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-center">Список пуст</div>
      </div>
    );

  return (
    <>
      <div className="border-4 rounded-md border-gray-300 dark:border-border p-4 m-1">
        <div className="flex flex-wrap items-center justify-center gap-2 py-4 mx-4 ">
          {categories.map((category) => (
            <ToggleButton
              key={category.categoryId}
              icon={category.icon}
              clickHandler={() => setCategory(category.categoryId)}
            />
          ))}
          <ToggleButton
            key="all"
            icon="🛒"
            clickHandler={() => {
              setCategory(-1);
            }}
          />
        </div>
        <div className="flex  flex-col items-center justify-center">
          <CategoryContent
            category={getCategory()}
            list={list}
            disabledList={marked}
            toggleItem={handleMarked}
          />
        </div>
      </div>
    </>
  );
}

export default UseListPage;
