import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (search.trim() === "") {
      
      message.warning("Please input search");
    } else navigate(`/app/menu?search=${search}`);
  };

  const handleKeyDownCheck = (e: any) => {
    if (e.keyCode === 13) {
      if (search.trim() === "") {
        message.warning("Please input search");
      }
      else
      navigate(`/app/menu?search=${search}`);
    }
  };
  return (
    <div className=" flex items-center mr-2">
      <input
        type="text"
        placeholder="Enter to search..."
        className="border-gray-600 outline-none py-1 px-2 rounded-l-lg border border-solid text-base"
        value={search}
        onChange={handleChangeSearch}
        onKeyDown={handleKeyDownCheck}
      />
      <SearchOutlined
        onClick={handleSubmit}
        className="border-gray-600 outline-none py-0.5 px-2 rounded-r-lg border border-solid text-[#f16331] text-lg cursor-pointer"
      />
    </div>
  );
};

export default Search;
