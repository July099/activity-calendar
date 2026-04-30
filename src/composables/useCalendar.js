import { ref } from 'vue'

export function useCalendar() {
  const currentDate = ref(new Date())
  const viewMode = ref('month') // 'month' | 'year'

  const prevMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    )
  }

  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    )
  }

  const prevYear = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear() - 1,
      currentDate.value.getMonth(),
      1
    )
  }

  const nextYear = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear() + 1,
      currentDate.value.getMonth(),
      1
    )
  }

  const goToMonth = (month) => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      month,
      1
    )
    viewMode.value = 'month'
  }

  const goToToday = () => {
    currentDate.value = new Date()
  }

  return {
    currentDate,
    viewMode,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    goToMonth,
    goToToday
  }
}
