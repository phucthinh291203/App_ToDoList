import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils'

const TaskListPagination = ({handleNextPage, handlePreviousPage, handlePageChanged, page, totalPages}) => {
  const generatePages = () => {
      const pages= []
      if(totalPages < 4) {
        // show all
        for(let i =1;i <= totalPages; i++)
          pages.push(i)
      } else {
        if (page <= 2){
          pages.push(1,2,3, "...", totalPages)
        } else if (page >= totalPages - 1) {
          pages.push(1, "...", totalPages - 2 , totalPages - 1, totalPages)
        } else {
          page.push(1, "..." , page, "...", totalPages)
        }
      }
      return pages
    }
  
  const pagesToShow = generatePages()

  return (
    <div className='flex justify-center mt-4'>
  
    <Pagination>
      <PaginationContent>
      {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
          onClick={page === 1 ? undefined : handlePreviousPage}
          className={cn("cursor-pointer",
            page === 1 && "pointer-events-none opacity-50"
          )}
           />
        </PaginationItem>

      {/* Pages to show */}
      {pagesToShow.map((p, index) => (
        <Pagination key={index}>
        { p === "..." ? (
          <PaginationEllipsis/> 
        ):(
          <PaginationLink
            isActive={p === page}
            onClick={() => {
              if (p !== page) handlePageChanged(p)
            }}
            className="cursor-pointer"
          > {p}

          </PaginationLink>
        ) }
        </Pagination>
      ) )}

      {/* Next button */}
        <PaginationItem>
          <PaginationNext
          onClick={page === totalPages ? undefined : handleNextPage}
          className={cn("cursor-pointer",
            (page >= totalPages || totalPages === 0) && "pointer-events-none opacity-50"
          )}/>
        </PaginationItem>
      
      </PaginationContent>
    </Pagination>
    
    </div>
  )
}

export default TaskListPagination