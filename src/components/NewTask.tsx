import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'

import style from './NewTask.module.css'

interface Task {
  id: string
  concluded: boolean
  description: string
}

export function NewTask() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  function handleCreatNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([
      {
        id: uuidv4(),
        concluded: false,
        description: newTaskText
      },
      ...tasks
    ])

    setNewTaskText('')
  }

  function handeNewTaskChance(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esta campo é obrigatório!')
  }

  const totalTasks = tasks.length
  const totalTasksConcluded = tasks.filter(
    task => task.concluded === true
  ).length

  return (
    <div className={style.newTask}>
      <form onSubmit={handleCreatNewTask} className={style.formTask}>
        <input
          name="task"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handeNewTaskChance}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button type="submit">
          Criar <PlusCircle size={16} weight="bold" />
        </button>
      </form>

      <header className={style.headerTasks}>
        <div className={style.tasksCreated}>
          <strong>Tarefas criadas</strong>
          <span>{totalTasks}</span>
        </div>
        <div className={style.tasksConcluded}>
          <strong>Concluídas</strong>
          <span>
            {totalTasksConcluded} de {totalTasks}
          </span>
        </div>
      </header>
    </div>
  )
}
