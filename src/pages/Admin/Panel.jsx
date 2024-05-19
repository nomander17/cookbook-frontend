import { useCallback, useEffect, useState } from "react";
import { EditModal } from "./EditModal";
import { TableHead, TableData } from "./TableComponents";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

export default function Panel({ currentTable }) {
  const [data, setData] = useState([]);
  const authHeader = useAuthHeader();
  const api = axios.create({
    baseURL: "http://localhost:8090/admin/api",
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`${currentTable}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }, [currentTable]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);

  const handleEdit = (id, row) => {
    console.log(`${currentTable.slice(0, -1)}Id: ${id}`);
    console.log(`Row number: ${row}`);
    setIsEditing(true);
    setEditingRow(data[row]);
    setEditingRowId(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/${currentTable}/${id}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(`Error deleting data: ${error}`);
    }
    fetchData();
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      if (updatedData.user) {
        delete updatedData.user;
      }
      if (updatedData.likes) {
        delete updatedData.likes;
      }
      if (updatedData.posts) {
        delete updatedData.posts;
      }
      if (updatedData.post) {
        delete updatedData.post;
      }
      const response = await api.put(
        `/${currentTable}/${id}`,
        updatedData,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(`Error updating data: ${error}`);
    }
    fetchData();
  };

  const keys = data[0] ? Object.keys(data[0]) : [];

  return (
    <div>
      <h1 className="text-center my-6 font-bold text-3xl text-slate-200 drop-shadow-md">
        {currentTable.toUpperCase()}
      </h1>
      <table className="table-auto min-w-full max-w-100 overflow-hidden divide-y divide-neutral-700">
        <tr>
          {keys.map((key) => (
            <TableHead key={key} text={key} />
          ))}
        </tr>
        {Array.isArray(data) ? (
          data.map((item, index) => {
            const idKey = Object.keys(item).find((k) =>
              k.toLowerCase().includes("id")
            );
            const rowId = item[idKey];

            return (
              <tr key={index}>
                {Object.entries(item).map(([key, value], i) => {
                  if (key === "image" || key === "avatar") {
                    if (value == null) {
                      return (
                        <TableData key={i}>
                          <p>[No image]</p>
                        </TableData>
                      );
                    } else {
                      return (
                        <TableData key={i}>
                          <img
                            src={`data:image/jpeg;base64,${value}`}
                            title={`${key}`}
                            className="max-w-xs max-h-40"
                            alt=""
                          />
                        </TableData>
                      );
                    }
                  }
                  if (Array.isArray(value)) {
                    value = value.length;
                  } else if (value && typeof value === "object") {
                    const idKey = Object.keys(value).find((k) =>
                      k.toLowerCase().includes("id")
                    );
                    value = idKey
                      ? value[idKey]
                      : JSON.stringify(value, null, 2).slice(0, 150);
                  } else if (typeof value === "string") {
                    value =
                      value.slice(0, 100) + (value.length > 100 ? " ..." : "");
                  }
                  return <TableData key={i} text={value} />;
                })}

                <TableData>
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleEdit(rowId, index)}
                  >
                    Edit
                  </button>
                </TableData>
                <TableData>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(rowId)}
                  >
                    Delete
                  </button>
                </TableData>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>
              <div className="text-center text-white mt-5 text-xl">
                Empty table.
              </div>
            </td>
          </tr>
        )}
      </table>
      {isEditing && editingRow ? (
        <EditModal
          row={editingRow}
          onClose={() => setIsEditing(false)}
          onSubmit={(updatedData) => handleUpdate(editingRowId, updatedData)}
        />
      ) : null}
    </div>
  );
}
