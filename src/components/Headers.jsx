import { useState } from "react";
export function Headers(){

    const [data, setData] = useState([{ key: "", value: "" }]);

    const handleAddRow = () => {
        setData([...data, { key: "", value: "" }]);
    };

    const handleRemoveRow = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const handleKeyChange = (index, key) => {
        const newData = [...data];
        newData[index].key = key;
        setData(newData);
    };

    const handleValueChange = (index, value) => {
        const newData = [...data];
        newData[index].value = value;
        setData(newData);
    };

    return (
        <div className="">
            <div className=" p-10 flex flex-col justify-center items-center ">
            <table className=" w-full bg-gray-300  shadow-md  border-2 border-black">
                <thead >
                    <tr>
                        <th className="border px-4 py-2">Key</th>
                        <th className="border px-4 py-2">Value</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={row.key}
                                    onChange={(e) => handleKeyChange(index, e.target.value)}
                                    className="w-full border-2 rounded p-1 border-black"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={row.value}
                                    onChange={(e) => handleValueChange(index, e.target.value)}
                                    className="w-full border-2 rounded p-1 border-black"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleRemoveRow(index)} className="text-white bg-red-600 px-4 py-1 rounded-lg hover:bg-red-800">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddRow} className="mt-2 bg-black text-white px-4 py-2 rounded">
                Add Row
            </button>
            </div>
        
        </div>
    );


}
