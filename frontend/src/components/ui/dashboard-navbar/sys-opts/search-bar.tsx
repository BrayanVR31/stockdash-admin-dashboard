import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputExpanded = isExpanded ? "w-48 px-3" : "w-0";
  return (
    <div
      className={`xl:flex items-center flex-row-reverse rounded-md border hidden`}
    >
      <input
        className={`outline-none bg-transparent ${inputExpanded} transition-all duration-300`}
        placeholder="Busca aquí..."
      />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="[&>svg]:w-5 flex items-center justify-center bg-transparent w-9 aspect-square hover:bg-neutral-600/90 transition-colors duration-500 rounded-md"
      >
        <Search />
      </button>
    </div>
  );
}

export { SearchBar };
