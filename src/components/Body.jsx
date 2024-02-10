import { useState } from "react";

export function Body({ onRequestBodyChange }){
    const [requestBody, setRequestBody] = useState("");

    function handleRequestBodyChange(e){
        const newRequestBody = e.target.value;
        setRequestBody(newRequestBody);
        onRequestBodyChange(newRequestBody); 
      };
    return (
        <div>
             <div className="mt-4 flex justify-center">
                        <textarea
                            placeholder="Enter the data in the form of given below format
                        
        {
                title : Example Title,
                body : Example Body',
                userId : 123
          }"
                            value={requestBody}
                            onChange={handleRequestBodyChange}
                            className="w-full mx-28 h-72  border-2 resize-none border-black outline-none rounded-lg p-[5px]"
                        />
                    </div>
        </div>
    )
}