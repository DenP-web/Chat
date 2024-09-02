import { useForm } from "react-hook-form";

import { SearchInput } from "../ui";
import SearchPopup from "../SearchPopup";

interface SidebarFormData {
  search: string;
}

const Search = () => {
  const { register, watch, resetField } = useForm<SidebarFormData>();
  const searchValue = watch("search");
  return (
    <>
      <SearchInput name="search" register={register} />
       <SearchPopup
        searchValue={searchValue}
        closePopup={() => resetField("search")}
      />
    </>
  );
};

export default Search;
