import React, { useState } from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar, Circle, SquarePen, CheckCircle2, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import api from '@/lib/axios'
import { toast } from 'sonner'

const TaskCard = ({task,index, handleTaskChanged}) => {
  
  const [isEditting, setIsEditting] = useState(false)
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "")
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter')
      updateTask() 
  }

  const updateTask =async () => {
    try {
      setIsEditting(false)
      await api.put(`/tasks/${task._id}`,{title: updateTaskTitle})
      toast.success(`Update task to ${updateTaskTitle} successfully`)
      handleTaskChanged()
    } catch (error) {
      console.error("Error update task", error)
      toast.error("Error update task")
    }
  }

  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status === "active"){
        await api.put(`/tasks/${task._id}`,{
          status: "completed",
          completedAt: new Date().toISOString()
        })
        toast.success(`Complete task, well done`)
      } else {
        await api.put(`/tasks/${task._id}`,{
          status: "active",
          completedAt: null
        })
        toast.success(`Wait what, not done yet?`)
      }
        handleTaskChanged()
    } catch (error) {
      console.error("Error checked task", error)
      toast.error("Error checked task")
    }
  }

  const deleteTask =async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      toast.success("Delete task successfully")
    } catch (error) {
      console.error("Error delete task", error)
      toast.error("Error delete task")
    }
    handleTaskChanged()
  }

  return(
    <Card className={cn(
      "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
      task.status === "completed" && "opacity-75"
    )}
    style={{animationDelay: `${index * 50}ms`}}
    >
    <div className='flex items-center gap-4'>

    {/* Circle button to checked the task (done the task) */}
    <Button
     variant='ghost'
     size='icon'
     className={cn(
      "shrink-0 size-8 rounded-full transition-all duration-200",
      task.status === "completed" ? "text-success hover:text-success/80" :
      "text-muted-foreground hover:text-primary"
     )}
     onClick={() => {toggleTaskCompleteButton()}}
     >
      {task.status === "completed" ? (
        <CheckCircle2 className="size-5"></CheckCircle2>
      ) : (
        <Circle className='size-5'></Circle>
      )
        
      }
    </Button>

    {/* Show or change title */}
      <div className='flex-1 min-w-0'>
        {isEditting ? (
          <Input placeholder="What to do?"
            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
            type="text"
            value={updateTaskTitle} 
            onChange={(e) => setUpdateTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={()=>{ //When user click mouse outside
              setIsEditting(false)
              setUpdateTaskTitle(task.title || "")
            }}
          />
        ) : (
          <p className={cn(
            "text-base transition-all duration-200",
            task.status === "completed" ? 
            "line-through text-muted-foreground"
            : "text-foreground"
          )}>
            {task.title}
          </p>
        )} 

        {/* CreatedDay and CompleteDay */}
      <div className='flex items-center gap-2 mt-1'>
        <Calendar className='size-3 text-muted-foreground'/>
        <span className="text-xs text-muted-foreground">
          {new Date(task.createdAt).toLocaleString()}
        </span>
        { task.completedAt && (
          <>
            <span className='text-xs text-muted-foreground'> - </span>
            <Calendar className='size-3 text-muted-foreground'/>
            <span className='text-xs text-muted-foreground'>
              {new Date(task.completedAt).toLocaleString}
            </span>
          </>
          )
        }
      </div>

      </div>


    {/* update and delete button */}
      <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
        {/* edit button */}
      <Button
       variant='ghost'
       size="icon"
       className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
       onClick={() => {
        setIsEditting(true)
        setUpdateTaskTitle(task.title || "")
       }}
      >
          <SquarePen className='size-4'/>
      </Button>

        {/* delete button */}

      <Button
       variant='ghost'
       size="icon"
       className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
       onClick={() => {deleteTask(task._id)}}
      >
          <Trash2 className='size-4'></Trash2>
      </Button>
      </div>

    </div>
    </Card>
  )
}

export default TaskCard