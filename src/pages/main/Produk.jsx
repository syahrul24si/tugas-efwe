import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ProdukTable from "./ProdukTable";
import data from "./produk.json";

export default function Produk() {
    return (
        <div>
            <PageHeader
                title="Produk"
                breadcrumb={["Dashboard", "Produk"]}
            >
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Product
                </button>
            </PageHeader>

            <div className="p-4">
                 <ProdukTable data={data.products} /> 
            </div>
        </div>
    );
}

