import { useState } from "react";
import testData from "./scripts/mock-data";
import Table from "./components/table";

function App() {
  const [data, setData] = useState(testData);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Record<string, boolean>>(
    testData
      .map((category) => category.name)
      .reduce((prev, curr) => {
        return { ...prev, [curr]: true };
      }, {}),
  );
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        multiple
        onChange={(e) =>
          setCategories({
            ...categories,
            [e.target.value]: !categories[e.target.value],
          })
        }
      >
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <Table data={data} search={search} categories={categories} />;
    </div>
  );
}

export default App;
