//app\(users)\profil\page.js
"use client";

import BlogList from "../../components/BlogList";
import { useState } from "react";

export default function PageDeProfil() {
      const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const handleSearchChange = (term) => {
    setSearchQuery(term);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };


    return (
        <>
        </>
    );
}