import CategoryContent from "@/components/CategoryContent";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ToggleButton from "@/components/ui/ToggleButton";
import type { Category, Item } from "@/data/Types";
import { useState } from "react";

function UseListPage({ categories }: { categories: Category[] }) {
  const list = JSON.parse(localStorage.getItem("list") || "[]") as number[];
  const categoriesToShow: number[] = [
    ...new Set(list.map((x) => Math.floor(x / 1000))),
  ];

  const [activeCategory, setCategory] = useState(() => {
    return categoriesToShow.length === 1 ? categoriesToShow[0] : -1;
  });
  const [marked, setMarked] = useState(
    JSON.parse(localStorage.getItem("markedList") || "[]") as number[]
  );
  const [showMarked, setShowMarked] = useState(true);

  const getCategory: () => Category = () => {
    if (activeCategory === -1) {
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

    const cat = categories[activeCategory - 1];
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
      <div className="border-4 rounded-md border-gray-300 dark:border-border p-4 m-1 bg-gradient-to-br from-muted-foreground/15 to-muted-foreground/25">
        <div className="flex flex-wrap items-center justify-center gap-2 py-4 mx-4 ">
          {categories.map(
            (category) =>
              categoriesToShow.includes(category.categoryId) && (
                <ToggleButton
                  key={category.categoryId}
                  icon={category.icon}
                  clickHandler={() => setCategory(category.categoryId)}
                  isActive={category.categoryId === activeCategory}
                />
              )
          )}
          {categoriesToShow.length > 1 && (
            <ToggleButton
              key="all"
              icon="🛒"
              clickHandler={() => {
                setCategory(-1);
              }}
              isActive={activeCategory === -1}
            />
          )}
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Label htmlFor="showMarked" className="text-xl">
            Показывать отмеченные
          </Label>
          <Switch
            id="showMarked"
            checked={showMarked}
            onClick={() => setShowMarked(!showMarked)}
            className="dark:bg-green-600"
          />
        </div>

        <div className="flex  flex-col items-center justify-center">
          <CategoryContent
            category={getCategory()}
            list={list}
            disabledList={marked}
            toggleItem={handleMarked}
            showDisabled={showMarked}
          />
        </div>
      </div>
    </>
  );
}

export default UseListPage;
