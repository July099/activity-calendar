<template>
  <div class="month-view">
    <div class="calendar-nav">
      <button class="nav-btn" @click="$emit('prev')">
        <span class="arrow">‹</span>
      </button>
      <div class="current-month">
        {{ currentYear }}年 {{ currentMonth + 1 }}月
      </div>
      <button class="nav-btn" @click="$emit('next')">
        <span class="arrow">›</span>
      </button>
    </div>
    
    <div class="weekdays">
      <div v-for="day in weekDays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>
    
    <div class="days-grid">
      <div 
        v-for="day in calendarDays" 
        :key="day.date"
        :class="['day-cell', {
          'other-month': !day.isCurrentMonth,
          'today': day.isToday,
          'selected': isSelected(day.date)
        }]"
        @click="handleDayClick(day)"
      >
        <span class="day-number">{{ day.dayOfMonth }}</span>
        <div class="events-container">
          <div 
            v-for="event in getDayEvents(day.date)" 
            :key="event.id"
            :class="['event-bar', event.color]"
            :title="event.title"
            @click.stop="$emit('event-click', event)"
          >
            <span class="event-title">{{ event.title }}</span>
          </div>
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

const emit = defineEmits(['prev', 'next', 'select', 'event-click'])

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const currentYear = computed(() => props.currentDate.getFullYear())
const currentMonth = computed(() => props.currentDate.getMonth())

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    days.push({
      date: date,
      dayOfMonth: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today)
    })
  }
  
  return days
})

const isSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

const isSelected = (date) => {
  return false
}

const getDayEvents = (date) => {
  return props.events.filter(event => {
    const eventStart = new Date(event.startDate)
    const eventEnd = new Date(event.endDate)
    const checkDate = new Date(date)
    
    eventStart.setHours(0, 0, 0, 0)
    eventEnd.setHours(0, 0, 0, 0)
    checkDate.setHours(0, 0, 0, 0)
    
    return checkDate >= eventStart && checkDate <= eventEnd
  })
}

const handleDayClick = (day) => {
  emit('select', day.date)
}
</script>

<style scoped>
.month-view {
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #ff6900;
  color: white;
}

.arrow {
  font-size: 24px;
  font-weight: 300;
}

.current-month {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.weekday {
  text-align: center;
  font-size: 14px;
  color: #666;
  padding: 8px;
  font-weight: 500;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day-cell {
  min-height: 100px;
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  border: 2px solid transparent;
}

.day-cell:hover {
  background: #e8e8e8;
  border-color: #ff6900;
}

.day-cell.other-month {
  opacity: 0.4;
  background: #fafafa;
}

.day-cell.today {
  background: #ff6900;
  color: white;
}

.day-cell.today .day-number {
  color: white;
  font-weight: 600;
}

.day-cell.selected {
  box-shadow: 0 0 0 2px #ff6900;
}

.day-number {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  font-weight: 500;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow: hidden;
}

.event-bar {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;
}

.event-bar:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.event-title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-bar.red { background: #ff4d4f; }
.event-bar.blue { background: #1890ff; }
.event-bar.green { background: #52c41a; }
.event-bar.yellow { background: #faad14; color: #333; }
.event-bar.purple { background: #722ed1; }
.event-bar.cyan { background: #13c2c2; }

@media (max-width: 768px) {
  .month-view {
    padding: 16px;
  }
  
  .day-cell {
    min-height: 70px;
    padding: 4px;
  }
  
  .day-number {
    font-size: 12px;
  }
  
  .event-bar {
    font-size: 9px;
    padding: 2px 4px;
  }
}
</style>
