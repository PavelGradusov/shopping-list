import { useState } from "react";
import CreateListPage from "./pages/CreateListPage";
import { Button } from "./components/ui/button";
import UseListPage from "./pages/UseListPage";

import data from "@/data/shopping_list.json";
import type { Category } from "./data/Types";

const categories: Category[] = data.sort((a, b) => a.order - b.order);

function App() {
  const list = JSON.parse(localStorage.getItem("list") || "[]") as number[];
  const [create, setCreate] = useState(list.length === 0);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-wrap gap-3 my-4">
        <Button
          className="transition-all duration-200 hover:-translate-y-1 active:translate-y-0 hover:shadow-lg my-4 text-2xl px-8 py-6 select-none"
          onClick={() => setCreate(true)}
          variant={create ? "outline" : "default"}
          disabled={create}
        >
          Создать/Редактировать
        </Button>
        <Button
          className="transition-all duration-200 hover:-translate-y-1 active:translate-y-0 hover:shadow-lg my-4 text-2xl px-8 py-6 select-none"
          onClick={() => setCreate(false)}
          variant={!create ? "outline" : "default"}
          disabled={!create}
        >
          Использовать
        </Button>
      </div>
      {create ? (
        <CreateListPage
          categories={categories}
          handleCreate={() => setCreate(false)}
        />
      ) : (
        <UseListPage categories={categories} />
      )}
    </div>
  );
}

export default App;
