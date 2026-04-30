<template>
  <div class="calendar-page">
    <header class="calendar-header">
      <div class="header-left">
        <h2>活动日历</h2>
        <span class="username">欢迎，{{ username }}</span>
      </div>
      <div class="header-right">
        <button class="mi-btn mi-btn-primary" @click="showAddModal = true">
          <span class="btn-icon">+</span>
          新增活动
        </button>
        <button class="mi-btn mi-btn-secondary" @click="handleLogout">
          退出
        </button>
      </div>
    </header>
    
    <main class="calendar-main">
      <div class="view-toggle">
        <button 
          :class="['toggle-btn', { active: viewMode === 'month' }]"
          @click="viewMode = 'month'"
        >
          月视图
        </button>
        <button 
          :class="['toggle-btn', { active: viewMode === 'year' }]"
          @click="viewMode = 'year'"
        >
          年视图
        </button>
      </div>
      
      <MonthView 
        v-if="viewMode === 'month'"
        :current-date="currentDate"
        :events="events"
        @prev="prevMonth"
        @next="nextMonth"
        @select="handleDateSelect"
        @event-click="handleEventClick"
      />
      
      <YearView 
        v-else
        :current-date="currentDate"
        :events="events"
        @prev="prevYear"
        @next="nextYear"
        @month-click="goToMonth"
      />
    </main>
    
    <EventModal
      v-if="showAddModal"
      :selected-date="selectedDate"
      @close="showAddModal = false"
      @save="handleSaveEvent"
    />
    
    <EventDetailModal
      v-if="selectedEvent"
      :event="selectedEvent"
      @close="selectedEvent = null"
      @delete="handleDeleteEvent"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MonthView from './MonthView.vue'
import YearView from './YearView.vue'
import EventModal from './EventModal.vue'
import EventDetailModal from './EventDetailModal.vue'
import { useCalendar } from '../composables/useCalendar.js'
import { useEvents } from '../composables/useEvents.js'

const props = defineProps({
  username: String
})

const emit = defineEmits(['logout'])

const { 
  currentDate, 
  viewMode,
  prevMonth, 
  nextMonth, 
  prevYear, 
  nextYear,
  goToMonth
} = useCalendar()

const { events, addEvent, deleteEvent } = useEvents()

const showAddModal = ref(false)
const selectedDate = ref(null)
const selectedEvent = ref(null)

const handleDateSelect = (date) => {
  selectedDate.value = date
  showAddModal.value = true
}

const handleEventClick = (event) => {
  selectedEvent.value = event
}

const handleSaveEvent = (eventData) => {
  addEvent(eventData)
  showAddModal.value = false
}

const handleDeleteEvent = (eventId) => {
  deleteEvent(eventId)
  selectedEvent.value = null
}

const handleLogout = () => {
  emit('logout')
}
</script>

<style scoped>
.calendar-page {
  min-height: 100vh;
  background: var(--mi-gray-100);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-left h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--mi-black);
  margin: 0;
}

.username {
  font-size: 14px;
  color: var(--mi-gray-600);
}

.header-right {
  display: flex;
  gap: 12px;
}

.btn-icon {
  margin-right: 4px;
  font-size: 18px;
}

.calendar-main {
  padding: 24px 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.view-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.toggle-btn {
  padding: 8px 20px;
  border: 1px solid var(--mi-gray-300);
  background: white;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn.active {
  background: var(--mi-orange);
  color: white;
  border-color: var(--mi-orange);
}

.toggle-btn:not(.active):hover {
  border-color: var(--mi-orange);
  color: var(--mi-orange);
}

@media (max-width: 768px) {
  .calendar-header {
    padding: 16px 20px;
    flex-direction: column;
    gap: 16px;
  }
  
  .header-left {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .calendar-main {
    padding: 16px;
  }
}
</style>
