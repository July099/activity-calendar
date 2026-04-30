<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content mi-card">
      <div class="modal-header">
        <h3>活动详情</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <div class="event-header">
          <div :class="['event-color', event.color]"></div>
          <h4 class="event-title">{{ event.title }}</h4>
        </div>
        
        <div class="event-info">
          <div class="info-item">
            <span class="info-label">开始日期</span>
            <span class="info-value">{{ formatDate(event.startDate) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">结束日期</span>
            <span class="info-value">{{ formatDate(event.endDate) }}</span>
          </div>
          <div class="info-item" v-if="event.description">
            <span class="info-label">备注</span>
            <span class="info-value description">{{ event.description }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">持续天数</span>
            <span class="info-value">{{ duration }} 天</span>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="mi-btn mi-btn-secondary" @click="$emit('close')">
          关闭
        </button>
        <button class="mi-btn delete-btn" @click="handleDelete">
          删除活动
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: Object
})

const emit = defineEmits(['close', 'delete'])

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

const duration = computed(() => {
  const start = new Date(props.event.startDate)
  const end = new Date(props.event.endDate)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return diffDays
})

const handleDelete = () => {
  if (confirm('确定要删除这个活动吗？')) {
    emit('delete', props.event.id)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--mi-black);
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--mi-gray-100);
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--mi-gray-200);
}

.event-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--mi-gray-200);
}

.event-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-color.red { background: var(--event-red); }
.event-color.blue { background: var(--event-blue); }
.event-color.green { background: var(--event-green); }
.event-color.yellow { background: var(--event-yellow); }
.event-color.purple { background: var(--event-purple); }
.event-color.cyan { background: var(--event-cyan); }

.event-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--mi-black);
  margin: 0;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: var(--mi-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 15px;
  color: var(--mi-text);
  font-weight: 500;
}

.info-value.description {
  font-weight: 400;
  line-height: 1.5;
  color: var(--mi-text-secondary);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--mi-gray-200);
}

.delete-btn {
  background: #FF5252;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: #E04646;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 82, 82, 0.3);
}

@media (max-width: 480px) {
  .modal-content {
    padding: 20px;
  }
}
</style>
