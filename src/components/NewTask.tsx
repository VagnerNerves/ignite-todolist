import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'

import style from './NewTask.module.css'

import clipBoard from '../assets/clipboard.svg'
import { Task } from './Task'

export interface Tasks {
  id: string
  concluded: boolean
  description: string
}

export function NewTask() {
  const [tasks, setTasks] = useState<Tasks[]>([])
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

  function deleteTask(taskToDelete: Tasks) {
    const taskWhithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete.id
    })

    setTasks(taskWhithoutDeletedOne)
  }

  function concluidTask(taskToConcluid: Tasks) {
    const taskWhithoutUpdate = tasks.map(task => {
      if (task.id === taskToConcluid.id) {
        return taskToConcluid
      } else {
        return task
      }
    })

    setTasks(taskWhithoutUpdate)
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

      {tasks.length === 0 ? (
        <section className={style.taskEmpty}>
          <img src={clipBoard} alt="CliBoard" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </section>
      ) : (
        tasks.map(task => {
          return (
            <Task
              key={task.id}
              taskProps={task}
              onConcluidTask={concluidTask}
              onDeleteTask={deleteTask}
            />
          )
        })
      )}
    </div>
  )
}
