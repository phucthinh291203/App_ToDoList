import React from 'react'

const Footer = ({completedTaskCount = 0, activeTasksCount = 0}) => {
  return <>
    { completedTaskCount + activeTasksCount > 0 && (
      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          {
            completedTaskCount > 0 && (
              <>
                Good job! You completed {completedTaskCount} tasks
                {
                  activeTasksCount > 0 && `, ${activeTasksCount} more tasks to do `
                }
              </>
            )
          }
          {completedTaskCount === 0 && activeTasksCount > 0 && (
            <>
              Let's start doing {activeTasksCount} tasks nowwww!
            </>
          )}

        </p>
      </div>
    )}
  </>
}

export default Footer