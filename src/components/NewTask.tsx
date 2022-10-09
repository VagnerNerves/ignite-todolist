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

  console.log(tasks)

  function handleCreatNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([
      {
        id: uuidv4(), //Colocar o Uiui id aqui
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
      <div>
        <p>Tasks</p>
      </div>
    </div>
  )
}
