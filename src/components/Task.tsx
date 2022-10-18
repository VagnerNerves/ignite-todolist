import { Check, Trash } from 'phosphor-react'
import { Tasks } from './NewTask'
import style from './Task.module.css'

interface TaskProps {
  taskProps: Tasks
  onConcluidTask: (task: Tasks) => void
  onDeleteTask: (task: Tasks) => void
}

export function Task({ taskProps, onDeleteTask, onConcluidTask }: TaskProps) {
  function handleConcluidTask() {
    const onConcluded = taskProps.concluded ? false : true

    const newTaskProps = { ...taskProps, concluded: onConcluded }
    onConcluidTask(newTaskProps)
  }

  function handleDeleteTask() {
    onDeleteTask(taskProps)
  }

  return (
    <section className={style.task}>
      <button
        onClick={handleConcluidTask}
        className={
          style.btnCheck +
          ' ' +
          (taskProps.concluded ? style.checked : style.unchecked)
        }
      >
        <Check size={16} weight="bold" />
      </button>
      <p
        className={
          style.description +
          ' ' +
          (taskProps.concluded ? style.descriptionConcluded : '')
        }
      >
        {taskProps.description}
      </p>
      <button onClick={handleDeleteTask} className={style.trash}>
        <Trash size={16} weight="bold" />
      </button>
    </section>
  )
}
