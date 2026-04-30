<template>
  <div class="year-view mi-card">
    <div class="calendar-nav">
      <button class="nav-btn" @click="$emit('prev')">
        <span class="arrow">‹</span>
      </button>
      <div class="current-year">{{ currentYear }}年</div>
      <button class="nav-btn" @click="$emit('next')">
        <span class="arrow">›</span>
      </button>
    </div>
    
    <div class="months-grid">
      <div 
        v-for="month in 12" 
        :key="month"
        class="month-card"
        @click="$emit('month-click', month - 1)"
      >
        <div class="month-header">{{ month }}月</div>
        <div class="month-mini">
          <div class="mini-weekdays">
            <span v-for="day in weekDays" :key="day" class="mini-weekday">{{ day }}</span>
          </div>
          <div class="mini-days">
            <span 
              v-for="day in getMonthDays(month - 1)" 
              :key="day.date"
              :class="['mini-day', {
                'has-event': day.hasEvent,
                'today': day.isToday
              }]"
            >
              {{ day.dayOfMonth }}
            </span>
          </div>
        </div>
        <div class="event-count" v-if="getMonthEventCount(month - 1) > 0">
          {{ getMonthEventCount(month - 1) }} 个活动
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentDate: Date,
  events: Array
})

const emit = defineEmits(['prev', 'next', 'month-click'])

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const currentYear = computed(() => props.currentDate.getFullYear())

const getMonthDays = (month) => {
  const year = currentYear.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const isCurrentMonth = date.getMonth() === month
    const hasEvent = isCurrentMonth && props.events.some(event => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      const checkDate = new Date(date)
      
      eventStart.setHours(0, 0, 0, 0)
      eventEnd.setHours(0, 0, 0, 0)
      checkDate.setHours(0, 0, 0, 0)
      
      return checkDate >= eventStart && checkDate <= eventEnd
    })
    
    days.push({
      date: date,
      dayOfMonth: date.getDate(),
      isCurrentMonth,
      isToday: isSameDay(date, today),
      hasEvent
    })
  }
  
  return days
}

const isSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

const getMonthEventCount = (month) => {
  const year = currentYear.value
  return props.events.filter(event => {
    const eventStart = new Date(event.startDate)
    const eventEnd = new Date(event.endDate)
    
    return (eventStart.getFullYear() === year && eventStart.getMonth() === month) ||
           (eventEnd.getFullYear() === year && eventEnd.getMonth() === month) ||
           (eventStart < new Date(year, month + 1, 0) && eventEnd > new Date(year, month, 1))
  }).length
}
</script>

<style scoped>
.year-view {
  padding: 24px;
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--mi-gray-100);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: var(--mi-orange);
  color: white;
}

.arrow {
  font-size: 24px;
  font-weight: 300;
}

.current-year {
  font-size: 24px;
  font-weight: 600;
  color: var(--mi-black);
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.month-card {
  background: var(--mi-gray-100);
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.month-card:hover {
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.month-header {
  font-size: 18px;
  font-weight: 600;
  color: var(--mi-black);
  margin-bottom: 12px;
  text-align: center;
}

.month-mini {
  display: flex;
  flex-direction: column;
}

.mini-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
}

.mini-weekday {
  text-align: center;
  font-size: 10px;
  color: var(--mi-gray-500);
  padding: 2px;
}

.mini-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.mini-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--mi-gray-600);
  border-radius: 4px;
}

.mini-day:not(.is-current-month) {
  opacity: 0.3;
}

.mini-day.has-event {
  background: var(--mi-orange);
  color: white;
  font-weight: 500;
}

.mini-day.today {
  box-shadow: 0 0 0 2px var(--mi-orange);
}

.event-count {
  margin-top: 8px;
  text-align: center;
  font-size: 12px;
  color: var(--mi-orange);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .months-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .months-grid {
    grid-template-columns: 1fr;
  }
  
  .year-view {
    padding: 16px;
  }
}
</style>
