import { useState } from "react";
import FilterTab from "./Filter";
import Table from "./Table";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function DataTable({
  columns = [],
  data = [],
  tabs = [],
  searchable = false,
  searchFields = [],
  searchPlaceholder = "Search...",
  itemsPerPage = 7,
  renderRow,
  keyField = "id",
  action,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) => {
    const matchTab =
      activeTab === "all"
        ? true
        : Object.values(item).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase() === activeTab
          );

    if (!searchable || !search) return matchTab;

    const matchSearch = searchFields.length
      ? searchFields.some((field) =>
          String(item[field] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : Object.values(item).some((val) =>
          String(val ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginated = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {tabs.length > 0 && (
        <FilterTab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(key) => {
            setActiveTab(key);
            setCurrentPage(1);
          }}
        />
      )}

      {searchable && (
        <div style={{ margin: "16px 0", display: "flex", alignItems: "center", gap: "12px" }}>
          <SearchBar
            placeholder={searchPlaceholder}
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            autoFocus
          />
          {action}
        </div>
      )}

      <Table columns={columns}>
        {paginated.map((item, index) =>
          renderRow(item, index, index === paginated.length - 1)
        )}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export { TableRow, TableCell };
