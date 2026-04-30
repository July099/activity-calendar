import { ref, watch } from 'vue'

const STORAGE_KEY = 'activity-calendar-events'

export function useEvents() {
  // 从 localStorage 加载数据
  const loadEvents = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to load events from localStorage:', e)
    }
    return []
  }

  const events = ref(loadEvents())

  // 保存到 localStorage
  const saveEvents = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events.value))
    } catch (e) {
      console.error('Failed to save events to localStorage:', e)
    }
  }

  // 监听变化自动保存
  watch(events, saveEvents, { deep: true })

  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      createdAt: new Date().toISOString()
    }
    events.value.push(newEvent)
    return newEvent
  }

  const updateEvent = (id, updates) => {
    const index = events.value.findIndex(e => e.id === id)
    if (index !== -1) {
      events.value[index] = {
        ...events.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      return events.value[index]
    }
    return null
  }

  const deleteEvent = (id) => {
    const index = events.value.findIndex(e => e.id === id)
    if (index !== -1) {
      events.value.splice(index, 1)
      return true
    }
    return false
  }

  const getEventById = (id) => {
    return events.value.find(e => e.id === id)
  }

  const getEventsByDateRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    return events.value.filter(event => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      
      return (eventStart >= start && eventStart <= end) ||
             (eventEnd >= start && eventEnd <= end) ||
             (eventStart <= start && eventEnd >= end)
    })
  }

  const clearAllEvents = () => {
    if (confirm('确定要清空所有活动吗？此操作不可恢复。')) {
      events.value = []
      return true
    }
    return false
  }

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsByDateRange,
    clearAllEvents
  }
}
