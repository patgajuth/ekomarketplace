import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { LeftArrowIcon, RightArrowIcon } from "../icons";
import Pagination from "./Pagination/Pagination";

function PaginationSection({ totalPages, onChange }: { totalPages: number; onChange: (page: number) => void }) {
  const [page, setPage] = useState(1);

 
  useEffect(() => {
    if (onChange) {
      onChange(page); 
    }
  }, [page, onChange]); 

  return (
    <div className="flex justify-between">
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
      <div className="flex gap-x-6">
        <Button
          withLeftIcon
          disabled={page === 1}
          leftIcon={<LeftArrowIcon />}
          buttonStyle="stroke"
          buttonSize="s"
          onClick={() => setPage((page) => (page > 1 ? page - 1 : page))}
        >
          Previous
        </Button>
        <Button
          withRightIcon
          disabled={page === totalPages}
          rightIcon={<RightArrowIcon />}
          buttonSize="s"
          buttonStyle="stroke"
          onClick={() => setPage((page) => (page === totalPages ? page : page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default PaginationSection;
