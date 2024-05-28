import { Dispatch, SetStateAction } from "react";

interface Props {
  categoriesShown: Record<string, Record<string, boolean>>;
  setCategoriesShown: Dispatch<
    SetStateAction<Record<string, Record<string, boolean>>>
  >;
}

export default function CategorySelectGroup({
  categoriesShown,
  setCategoriesShown,
}: Props) {
  return (
    <>
      <select
        className="fixed top-0 left-40 h-20 border border-slate-900 bg-slate-800 w-32 px-2"
        onChange={(e) => {
          const { value } = e.target;
          setCategoriesShown((prev) => ({
            ...prev,
            [value]: Object.keys(prev[value]).reduce((acc, curr) => {
              return { ...acc, [curr]: !prev[value][curr] };
            }, {}),
          }));
        }}
        multiple
      >
        {Object.keys(categoriesShown).map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      <select
        className="fixed top-0 left-72 px-2 h-20 border border-slate-900 bg-slate-800"
        onChange={(e) => {
          const { value } = e.target;
          const [category, subcategory] = value.split(",");
          setCategoriesShown((prev) => ({
            ...prev,
            [category]: {
              ...prev[category],
              [subcategory]: !prev[category][subcategory],
            },
          }));
        }}
        multiple
      >
        {Object.keys(categoriesShown).map((category) => {
          return (
            <optgroup key={category} label={category}>
              {Object.keys(categoriesShown[category]).map((subcategory) => {
                return (
                  <option
                    key={`${category}-${subcategory}`}
                    value={[category, subcategory]}
                  >
                    {subcategory}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </>
  );
}
