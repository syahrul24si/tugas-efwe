export default function Badge({ status }) {
    const style = {
    Active: "bg-blue-600 hover:bg-blue-700 text-white",
    Inactive: "bg-red-600 hover:bg-red-700 text-white",
    Pending: "bg-yellow-500 hover:bg-yellow-600 text-white",
    Cancelled: "bg-gray-500 hover:bg-gray-600 text-white",
    Completed: "bg-green-600 hover:bg-green-700 text-white",
    };
    
    const statusStyle = style[status] || {
        background: "#333",
        color: "#aaa",
    };

  return (
    <span
      className={`${style[status]} px-4 ml-2 rounded-lg`}
    >
      {status}
    </span>
  );
}