export const TableData = ({ text, children }) => {
  const isByteArray = text instanceof Uint8Array;

  return (
    <td className="px-6 py-4 text-sm font-medium whitespace-pre-wrap text-neutral-200">
      {isByteArray ? (
        <img
          src={URL.createObjectURL(new Blob([text], { type: "image/jpeg" }))}
          alt=""
          className="max-w-xs max-h-40" />
      ) : (
        text || children
      )}
    </td>
  );
};
export const TableHead = ({ text }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-start text-m font-medium uppercase text-neutral-500"
    >
      {text}
    </th>
  );
};
