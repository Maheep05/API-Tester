import { useEffect, useState } from "react"
import img from '../assets/loading.gif'

export function SearchBar() {

    const [response, setResponse] = useState(null);
    const [url, setUrl] = useState('');
    const [drop, setDrop] = useState(false);
    const [options, setOptions] = useState('body');
    const [selectedMethod, setSelectedMethod] = useState("GET");
    const [requestBody, setRequestBody] = useState("");

    async function fetchData() {
        setResponse("Loading...");
        try {
            const requestOptions = {
                method: selectedMethod,
                headers: {
                    "Content-Type": "application/json ; charset=UTF-8",

                },
                body: options === "body" ? JSON.stringify(JSON.parse(requestBody)) : undefined,
            };

            const res = await fetch(url, requestOptions);

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(error);
            setResponse("Unable to fetch data. Enter a URL to get the data");
        }
    }


    useEffect(() => {
        if (url && selectedMethod) {
            fetchData();
        }
    }, [url, selectedMethod, options, requestBody]);
    function handleSubmit() {
        fetchData();
    }

    function handleClick() {
        setDrop((prev) => !prev)
    }

    function handleMethodClick(method) {
        setSelectedMethod(method);
        setDrop(false);
    }

    function handleOptionClick(option) {
        setOptions(option)
    }

    return (
        <div className="sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="flex flex-row    sm:flex-row justify-center my-8">
                <div className="flex gap-1 w-16 items-center cursor-pointer border-2 p-[5px] rounded-lg hover:border-black font-semibold" onClick={handleClick}>
                    <p>{selectedMethod}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                {drop && (
                    <div className="absolute left-[30px] top-[75px] sm:left-[548px]  sm:top-[75px] mt-2 sm:mt-0 border-2 p-1 items-center border-black rounded-lg bg-white shadow-lg">
                        <p className="hover:bg-gray-300 p-1 rounded-lg cursor-pointer" onClick={() => handleMethodClick("GET")}>
                            GET
                        </p>
                        <p className="hover:bg-gray-300 p-1 rounded-lg cursor-pointer" onClick={() => handleMethodClick("POST")}>
                            POST
                        </p>
                        <p className="hover:bg-gray-300 p-1 rounded-lg cursor-pointer" onClick={() => handleMethodClick("PUT")}>
                            PUT
                        </p>
                        <p className="hover:bg-gray-300 p-1 rounded-lg cursor-pointer" onClick={() => handleMethodClick("DELETE")}>
                            DELETE
                        </p>
                    </div>
                )}


                <div className="px-6 flex justify-center items-center">
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter a url" className=" w-64 border-2 border-black outline-none rounded-l-lg p-[5px]" />
                    <button className="aboslute bg-black text-white p-[6.7px] rounded-r-lg" onClick={handleSubmit}>Submit</button>
                </div>

            </div>

            <div>
                <div className="flex justify-center items-center sm:flex-row gap-2  text-lg font-medium sm:px-2 md:px-4 lg:px-6 xl:px-8">
                    <button className={`hover:bg-gray-300 p-2 rounded-lg ${options === 'params' ? 'bg-gray-300' : ""}`} onClick={() => handleOptionClick("params")}>Params</button>
                    <button className={`hover:bg-gray-300 p-2 rounded-lg ${options === 'headers' ? 'bg-gray-300' : ""}`} onClick={() => handleOptionClick("headers")}>Headers</button>
                    <button className={`hover:bg-gray-300 p-2 rounded-lg ${options === 'body' ? 'bg-gray-300' : ""}`} onClick={() => handleOptionClick("body")}>Body</button>
                </div>

                { options === "params" && (
                    <div className=" flex  flex-col justify-center items-center"><img src={img} alt="" className="w-[600px] py-2"/><p className="text-3xl font-bold ">Updating</p></div>
                )}


                { options === "headers" && (
                    <div className=" flex  flex-col justify-center items-center"><img src={img} alt="" className="w-[600px] py-2"/><p className="text-3xl font-bold ">Updating</p></div>
                )}


                {options === "body" && (
                    <div className="mt-4 flex justify-center">
                        <textarea
                            placeholder="Enter the data in the form of given below format
                        
        {
                title : Example Title,
                body : Example Body',
                userId : 123
          }"
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            className="w-full mx-28 h-72  border-2 resize-none border-black outline-none rounded-lg p-[5px]"
                        />
                    </div>
                )}
            </div>


            {response && <div className="flex justify-center items-center w-[450px] mx-20 p-10 rounded-lg">
                <div className=' bg-black text-white rounded-lg  p-6'>
                    <h2 className="text-lg font-semibold">Response:</h2>
                    <pre className="text-wrap min-h-60 max-w-96">{response}</pre>
                </div>

            </div>}

        </div>
    )
}