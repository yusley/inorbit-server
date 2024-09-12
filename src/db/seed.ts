import { client, db } from '.'
import { goals, goalsComplete } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalsComplete)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Jogar Video-Game', desiredWeeklyFrequency: 7 },
      { title: 'Estudar', desiredWeeklyFrequency: 5 },
    ])
    .returning()

  const startWeek = dayjs().startOf('week')

  await db.insert(goalsComplete).values([
    { goalId: result[0].id, createdAt: startWeek.toDate() },
    { goalId: result[1].id, createdAt: startWeek.add(1, 'day').toDate() },
    { goalId: result[2].id, createdAt: startWeek.add(2, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
