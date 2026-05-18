import { useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import FilterTab from "../../components/Filter";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import TableCell from "../../components/TableCell";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "title", label: "TITLE" },
  { key: "category", label: "CATEGORY" },
  { key: "brand", label: "BRAND" },
  { key: "price", label: "PRICE" },
  { key: "stock", label: "STOCK" },
];

const ITEMS_PER_PAGE = 7;

export default function ProdukTable({ data = [] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("all");

    const filteredData =
        activeTab === "all"
        ? data
        : data.filter(
            (item) => item.category.toLowerCase() === activeTab
            );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginated = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    const tabs = [
    { key: "all", label: "All", count: data.length },
    { key: "fashion", label: "Fashion", count: data.filter((d) => d.category?.toLowerCase() === "fashion").length },
    { key: "electronics", label: "Electronics", count: data.filter((d) => d.category?.toLowerCase() === "electronics").length },
    { key: "accessories", label: "Accessories", count: data.filter((d) => d.category?.toLowerCase() === "accessories").length },
    { key: "home appliances", label: "Home Appliances", count: data.filter((d) => d.category?.toLowerCase() === "home appliances").length },
  ];

  return (
    <div
        style={{
            background: "#141414",
            minHeight: "100vh",
            padding: "32px",
            fontFamily: "sans-serif",
            color: "#fff",
        }}
        >
        <PageHeader title="Products" />

        <FilterTab
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(key) => {
                setActiveTab(key);
                setCurrentPage(1);
            }}
        />

      <Table columns={COLUMNS}>
        {paginated.map((item, index) => (
          <TableRow key={item.id} isLast={index === paginated.length - 1}>
            <TableCell>{item.id}</TableCell>
            <TableCell style={{ color: "#fff", fontWeight: 500 }}>
              <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                {item.title}
              </Link>
            </TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell>Rp {item.price?.toLocaleString()}</TableCell>
            <TableCell>{item.stock}</TableCell>
          </TableRow>
        ))}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <Footer />
    </div>
  );
}