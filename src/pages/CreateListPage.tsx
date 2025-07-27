import { useState } from "react";

import { Button } from "@/components/ui/button";
import CategoryContent from "@/components/CategoryContent";
import ToggleButton from "@/components/ui/ToggleButton";
import type { Category } from "@/data/Types";
import { toast } from "sonner";

function CreateListPage({
  categories,
  handleCreate,
}: {
  categories: Category[];
  handleCreate: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState(3);

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list") || "[]") as number[]
  );

  const toggleItem = (itemId: number) => {
    if (list.includes(itemId)) {
      setList(list.filter((item) => item !== itemId));
    } else {
      setList([...list, itemId]);
    }
  };

  const handleCreateList = (list: number[]) => {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("markedList", JSON.stringify([]));
    if (list.length === 0) {
      toast.success("Список очищен!");
      return;
    }
    handleCreate();
    toast.success("Список успешно создан!");
  };

  const exportToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(list));
    toast.success("Список скопирован в буфер обмена!");
  };

  const importFromClipboard = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setList(JSON.parse(text) as number[]);
        toast.success("Список успешно загружен!");
      })
      .catch((error) => {
        console.error("Failed to read clipboard contents:", error);
      });
  };

  return (
    <>
      <div className="border-4 rounded-md border-gray-300 dark:border-border p-4 m-1">
        <div className="flex items-center justify-center my-2 flex-wrap gap-4">
          <Button
            className="text-3xl px-4 py-6"
            variant="outline"
            onClick={() => exportToClipboard()}
          >
            📤
          </Button>
          <Button
            className="text-3xl px-4 py-6"
            variant="outline"
            onClick={() => importFromClipboard()}
          >
            📥
          </Button>
          <Button
            className="transition-all duration-200 hover:-translate-y-1 active:translate-y-0 hover:shadow-lg my-4 text-2xl px-8 py-6 select-none"
            variant={"outline"}
            onClick={() => {
              handleCreateList([]);
              setList([]);
            }}
          >
            Сбросить
          </Button>
          <Button
            className="transition-all duration-200 hover:-translate-y-1 active:translate-y-0 hover:shadow-lg my-4 text-2xl px-8 py-6 select-none"
            onClick={() => handleCreateList(list)}
          >
            Создать список
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 py-4 mx-4 ">
          {categories.map((category) => (
            <ToggleButton
              key={category.categoryId}
              icon={category.icon}
              clickHandler={() => setActiveCategory(category.categoryId)}
              isActive={category.categoryId === activeCategory}
            />
          ))}
        </div>
        <div className="flex  flex-col items-center justify-center">
          <CategoryContent
            category={
              categories.find((cat) => cat.categoryId === activeCategory)!
            }
            list={list}
            toggleItem={toggleItem}
          />
        </div>
      </div>
    </>
  );
}

export default CreateListPage;
