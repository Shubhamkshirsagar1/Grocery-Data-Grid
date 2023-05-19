import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterBar from "../components/FilterBar/FilterBar";
import { useNavigate } from "react-router-dom";
import DetailsPage from "../components/DetailsPage/DetailsPage";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const fetchProductList = async (page) => {
    try {
      const response = await axios.get(
        `https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${page}`
      );
      const { products, totalPages } = response.data;
      setProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    fetchProductList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const categories = [
      ...new Set(products.map((product) => product.category_level_1)),
    ];
    setCategories(categories);
  }, [products]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const filterName = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "" || product.category_level_1 === selectedCategory;
    return filterName && categoryMatch;
  });

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    console.log("Products---------:", product.id);
    navigate(`/details/${product.id}`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      <Products
        products={filteredProducts}
        onSelect={handleProductSelect}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        keyExtractor={(product) =>
          product.id ? product.id.toString() : new Date().getTime().toString()
        }
      />
      {selectedProduct && (
        <DetailsPage product={selectedProduct} />
      )}
    </div>
  );
};

export default Home;
