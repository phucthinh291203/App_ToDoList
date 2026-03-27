import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilter from '@/components/StatsAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import { Pagination } from '@/components/ui/pagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'
import {visibleTaskLimit} from '@/lib/data'
const HomePage = () => {

  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completedTaskCount, setCompletedTaskCount] = useState(0)
  const [filter, setFilter] = useState("all")
  const [dateQuery, setDateQuery] = useState("today")
  const [page, setPage] = useState(1)
  

  //logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?timeFilter=${dateQuery}`)
      setTaskBuffer(res.data.tasks)
      setActiveTaskCount(res.data.activeCount)
      setCompletedTaskCount(res.data.completedCount)
    } catch (error) {
      console.error("Error when try to get Tasks", error)
      toast.error("Error when try to get Tasks")
    }
  }

  useEffect(() => {
  const timeout = setTimeout(() => {
    fetchTasks()}, 300) // delay 300ms
  return () => clearTimeout(timeout);
  }, [dateQuery]);

  useEffect( () => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1)
  }, [filter,dateQuery])

  const handleTaskChanged = () => {
     fetchTasks()
  }

  // const handleDeletedTask = () => {
  //    fetchTasks()
  // }

  //variable
  const filteredTask = taskBuffer.filter((task) => {
    switch(filter){
      case "active":
        return task.status === "active"
      case "completed":
        return task.status === "completed"
      default:
        return true
    }
  } )

  const visibleTasks = filteredTask.slice(
    (page - 1) * visibleTaskLimit, page * visibleTaskLimit
  )

  const totalPages = Math.ceil(filteredTask.length / visibleTaskLimit) //Chia làm tròn 

  //Why is prev? To help you get the previous state of page
  //If you use setPage(page + 1), the page may not rendered yet if you click too fast
  //Which lead to the situation the page rendered at page 2 but you are at page 3
  const handleNextPage = () => {
    if(page < totalPages){
      setPage((prev) => prev + 1) 
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handlePageChanged = (newPage) => {
    setPage(newPage)
  }

  if (visibleTasks.length === 0 && page > 1) {    //When delete all task of current page, move to previous page
    handlePreviousPage()
  }

  return (

    <div className="min-h-screen w-full bg-[#f8fafc] relative">
  {/* Soft Morning Mist Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(135deg, 
          rgba(248,250,252,1) 0%, 
          rgba(219,234,254,0.7) 30%, 
          rgba(165,180,252,0.5) 60%, 
          rgba(129,140,248,0.6) 100%
        ),
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
      `,
    }}
  />
  {/* Your Content/Components */}
    <div className='container pt-8 mx-auto relative z-10'>
      <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
      
      {/*Header*/}
      <Header/>

      {/*Add new task */} 
      <AddTask handleNewTaskAdded={handleTaskChanged}/>

      {/*Stats and Filter */}
      <StatsAndFilter
       activeTasksCount={activeTaskCount}
       completedTasksCount={completedTaskCount}
       filter= {filter}
       setFilter={setFilter}
       />

      {/* Task List */}
      <TaskList
       filteredTask = {visibleTasks}
       filter = {filter}
       handleTaskChanged={handleTaskChanged}
      />

      {/* Pagination and date filter */}
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TaskListPagination
            handleNextPage = {handleNextPage}
            handlePreviousPage = {handlePreviousPage}
            handlePageChanged = {handlePageChanged}
            page = {page}
            totalPages = {totalPages}
          />
          <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
      </div>

      {/* Footer */}
      <Footer completedTaskCount={completedTaskCount}
        activeTasksCount={activeTaskCount}
      />
      
      </div>
    </div>
  </div>

   
  )
}

export default HomePage