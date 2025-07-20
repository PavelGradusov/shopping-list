import type { Category } from "@/data/Types";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

function CategoryContent({
  category,
  list,
  disabledList,
  showDisabled = true,
  toggleItem,
}: {
  category: Category;
  list: number[];
  disabledList?: number[];
  showDisabled?: boolean;
  toggleItem: (itemId: number) => void;
}) {
  const listToShow = showDisabled
    ? category.items
    : category.items.filter((item) => !disabledList?.includes(item.itemId));

  console.log(listToShow);
  console.log(disabledList);

  return (
    <div key={category.categoryId}>
      <h2 className="text-3xl font-bold mt-6 mb-4 text-center select-none">
        {category.categoryName}
      </h2>
      {listToShow.length === 0 ? (
        <p className="text-2xl font-bold text-center">Тут ничего нет</p>
      ) : (
        <ul>
          {listToShow.map((item) => (
            <li key={item.itemId}>
              <div className="flex items-center space-x-3 my-1 py-1 mx-8 ">
                <Switch
                  id={item.itemName}
                  checked={
                    list.includes(item.itemId) &&
                    !disabledList?.includes(item.itemId)
                  }
                  onClick={() => toggleItem(item.itemId)}
                />
                <Label
                  htmlFor={item.itemName}
                  className={`text-2xl ${
                    disabledList?.includes(item.itemId) ? "line-through" : ""
                  }`}
                >
                  {item.itemName}
                </Label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryContent;
