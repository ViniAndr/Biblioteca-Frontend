import { LuClipboardEdit, LuTrash2, LuEye } from "react-icons/lu";

import ButtonIcon from "../common/ButtonIcon";

const TableBody = ({ data, fields, view = true }) => {
  const stytleFields = fields.length < 3 ? "text-left" : "text-center";

  const handleUpdate = (item) => {
    console.log("Update", item);
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item) => (
        <tr key={item.id}>
          {fields.map((field, index) => (
            <td key={index} className={`px-6 py-4 whitespace-nowrap text-sm ${stytleFields}`}>
              {typeof field === "function" ? field(item) : item[field]}
            </td>
          ))}
          <td className="px-6 flex justify-end gap-2 py-3">
            {view && <ButtonIcon icon={<LuEye />} onClick={() => handleUpdate(item)} variant="secondary" />}
            <ButtonIcon icon={<LuClipboardEdit />} onClick={() => handleUpdate(item)} variant="secondary" />
            <ButtonIcon icon={<LuTrash2 />} onClick={() => handleUpdate(item)} variant="secondary" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
