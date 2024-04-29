import { useEffect, useState } from "react";
import request from "../../axiosHelper";

export default function Panel({ currentTable }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await request.get(`/admin/${currentTable}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentTable]);

  const keys = data[0] ? Object.keys(data[0]) : [];

  if (keys.length === 0) {
    // do something
  }

  const handleEdit = (id) => {};
  const handleDelete = async (id) => {
    try {
      const response = await request.delete(`/admin/${currentTable}/${id}`);
      console.log(response);
    } catch (error) {
      console.error(`Error deleting data: ${error}`);
    }
    fetchData();
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl">
        {currentTable.toUpperCase()}
      </h1>
      <table className="table-auto min-w-full max-w-100 overflow-hidden divide-y divide-gray-200 dark:divide-neutral-700">
        <tr>
          {keys.map((key) => (
            <TableHead key={key} text={key} />
          ))}
        </tr>
        {Array.isArray(data) && data.map((item, index) => {
          const idKey = Object.keys(item).find((k) =>
            k.toLowerCase().includes("id")
          );
          const rowId = item[idKey];
  
          return (
            <tr key={index}>
              {Object.entries(item).map(([key, value], i) => {
                if (value && typeof value === "object") {
                  const idKey = Object.keys(value).find((k) =>
                    k.toLowerCase().includes("id")
                  );
                  value = idKey ? value[idKey] : JSON.stringify(value);
                }
                return <TableData key={i} text={value} />;
              })}
  
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEdit(rowId)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(rowId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })
        // Pretty this up
        || (<div>Empty table.</div>)
        }
      </table>
    </div>
  );
}

const TableData = ({ text }) => {
  return (
    <td
      scope="col"
      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
    >
      {text}
    </td>
  );
};

const TableHead = ({ text }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
    >
      {text}
    </th>
  );
};
