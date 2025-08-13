import React, { useEffect, useMemo, useState } from "react";
import Single_item from "./Single_item";
import { IoSearch } from "react-icons/io5";

const AllItemsView = () => {
  const [items, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // search + category filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("https://b11a11-server-side-sajjadjim.vercel.app/itemsAll")
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  // unique category list for dropdown
  const categories = useMemo(() => {
    const set = new Set();
    items.forEach((i) => i?.category && set.add(i.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn loading">loading</button>
      </div>
    );
  }

  // Combined filter: search (title/location) + category
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (item.category && item.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Controls row */}
      <div className="w-11/12 md:w-1/2 mb-4 grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        {/* Search */}
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="Search by title or location"
            className="input input-bordered w-full pr-10 rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search items by title or location"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <IoSearch size={20} />
          </span>
        </div>

        {/* Category filter */}
        <div>
          <select
            className="select select-bordered w-full rounded-2xl"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="md:text-4xl text-2xl font-bold mb-2">All Items</p>

      {/* Empty state */}
      {filteredItems.length === 0 ? (
        <div className="text-sm text-gray-500 mt-4">
          No items match your search/filter.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 p-4 grid-cols-1 w-10/12">
          {filteredItems.map((item) => (
            <Single_item item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllItemsView;
