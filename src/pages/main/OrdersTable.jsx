import { useState } from "react";
import OrderDetail from "./OrderDetail";

import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import FilterTab from "../../components/Filter";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import TableCell from "../../components/TableCell";
import StatusBadge from "../../components/Badge";
import IconButton from "../../components/IconButton";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

const COLUMNS = [
  { key: "order_id", label: "ID" },
  { key: "customer_name", label: "USERNAME" },
  { key: "status", label: "STATUS" },
  { key: "total_price", label: "TOTAL PRICE" },
  { key: "order_date", label: "ORDER DATE" },
  { key: "order_details", label: "ORDER DETAILS" },
];

const ITEMS_PER_PAGE = 7;

export default function OrdersTable({ data = SAMPLE_DATA }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const filteredData =
    activeTab === "all"
      ? data
      : data.filter(
          (item) => item.status.toLowerCase() === activeTab
        );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginated = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const tabs = [
    { key: "all", label: "All", count: data.length },
    { key: "pending", label: "Pending", count: data.filter((d) => d.status === "Pending").length },
    { key: "cancelled", label: "Cancelled", count: data.filter((d) => d.status === "Cancelled").length },
    { key: "completed", label: "Completed", count: data.filter((d) => d.status === "Completed").length },
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

      <PageHeader
        title="Orders"
      />

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
          <TableRow key={item.order_id} isLast={index === paginated.length - 1}>
            <TableCell>{item.order_id}</TableCell>
            <TableCell style={{ color: "#fff", fontWeight: 500 }}>
              {item.customer_name}
            </TableCell>
            <TableCell><Badge status={item.status} /></TableCell>
            <TableCell>{item.total_price}</TableCell>
            <TableCell>{item.order_date}</TableCell>
            <TableCell>
              <OrderDetail order={item} />
            </TableCell>
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