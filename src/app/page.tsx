"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "./_components/ProtectedRoute";
import SpinningLoader from "./_components/SpinningLoader";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const pageSize = 6;
  const maxPageButtons = 7;
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoriesLoading(true);
        const response = await fetch(
          `/api/categories?page=${currentPage}&pageSize=${pageSize}`,
        );
        const data = await response.json();
        setCategories(data.categories);
        setTotalCategories(data.totalCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    }
    fetchCategories();
  }, [currentPage]);

  useEffect(() => {
    async function fetchSelectedCategories() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const selectedResponse = await fetch("/api/user/categories", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (selectedResponse.ok) {
            const selectedData = await selectedResponse.json();
            setSelectedCategories(selectedData.map((c) => c.id));
          }
        } catch (error) {
          console.error("Failed to fetch selected categories:", error);
          localStorage.removeItem("token");
        }
      }
    }
    fetchSelectedCategories();
  }, []);

  const handleCheckboxChange = async (categoryId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const isSelected = !selectedCategories.includes(categoryId);
      const newSelectedCategories = isSelected
        ? [...selectedCategories, categoryId]
        : selectedCategories.filter((id) => id !== categoryId);

      setSelectedCategories(newSelectedCategories);

      try {
        await fetch("/api/user/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            categoryId,
            isSelected,
          }),
        });
      } catch (error) {
        console.error("Failed to update category selection:", error);
      }
    }
  };

  const totalPages = Math.ceil(totalCategories / pageSize);

  const generatePageNumbers = () => {
    let startPage, endPage;

    if (totalPages <= maxPageButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const mid = Math.ceil(maxPageButtons / 2);
      startPage = Math.max(1, currentPage - mid + 1);
      endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

      if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <ProtectedRoute>
      <div className="m-auto mt-8 mb-4 w-[90%] rounded-xl border-2 border-darkGray px-6 pb-4 sm:w-[30rem] sm:px-[2.5rem] lg:pb-8">
        <h1 className="my-4 text-center text-lg sm:text-2xl font-bold lg:my-6">
          Please mark your interests!
        </h1>
        <p className="mb-8 text-center text-sm">We will keep you notified.</p>
        <ul className="h-[10rem]">
          {categoriesLoading
            ? <div className="flex justify-center">
                <SpinningLoader large={true}/>
            </div>
            : categories.map((category) => (
                <li
                  key={category.id}
                  className="mb-2 flex items-center gap-2 text-sm"
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCheckboxChange(category.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border border-black rounded flex items-center justify-center ${selectedCategories.includes(category.id) ? 'bg-black' : 'bg-white'}`}
                    >
                      {selectedCategories.includes(category.id) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-2">{category.name}</div>
                  </label>
                </li>
              ))}
        </ul>
        <div className="mt-4 flex justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            {"<<"}
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="text-darkGray"
          >
            {"<"}
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`${currentPage === number ? "font-bold text-black" : "text-darkGray"}`}
            >
              {number}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="text-darkGray"
          >
            {">"}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="text-darkGray"
          >
            {">>"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
