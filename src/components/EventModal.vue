<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content mi-card">
      <div class="modal-header">
        <h3>新增活动</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label>活动名称</label>
          <input 
            v-model="form.title"
            type="text" 
            class="mi-input"
            placeholder="请输入活动名称"
          />
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>开始日期</label>
            <input 
              v-model="form.startDate"
              type="date" 
              class="mi-input"
            />
          </div>
          <div class="form-group">
            <label>结束日期</label>
            <input 
              v-model="form.endDate"
              type="date" 
              class="mi-input"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label>活动颜色</label>
          <div class="color-picker">
            <div 
              v-for="color in colors" 
              :key="color.value"
              :class="['color-option', color.value, { selected: form.color === color.value }]"
              @click="form.color = color.value"
              :title="color.label"
            ></div>
          </div>
        </div>
        
        <div class="form-group">
          <label>备注（可选）</label>
          <textarea 
            v-model="form.description"
            class="mi-input"
            rows="3"
            placeholder="添加活动备注..."
          ></textarea>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="mi-btn mi-btn-secondary" @click="$emit('close')">
          取消
        </button>
        <button class="mi-btn mi-btn-primary" @click="handleSave" :disabled="!isValid">
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  selectedDate: Date
})

const emit = defineEmits(['close', 'save'])

const colors = [
  { value: 'red', label: '红色' },
  { value: 'blue', label: '蓝色' },
  { value: 'green', label: '绿色' },
  { value: 'yellow', label: '黄色' },
  { value: 'purple', label: '紫色' },
  { value: 'cyan', label: '青色' }
]

const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const form = ref({
  title: '',
  startDate: props.selectedDate ? formatDate(props.selectedDate) : formatDate(new Date()),
  endDate: props.selectedDate ? formatDate(props.selectedDate) : formatDate(new Date()),
  color: 'red',
  description: ''
})

const isValid = computed(() => {
  return form.value.title.trim() && 
         form.value.startDate && 
         form.value.endDate &&
         new Date(form.value.startDate) <= new Date(form.value.endDate)
})

const handleSave = () => {
  if (!isValid.value) return
  
  emit('save', {
    id: Date.now().toString(),
    ...form.value
  })
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
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
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

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--mi-text);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.color-picker {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.color-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  box-shadow: 0 0 0 3px white, 0 0 0 5px var(--mi-gray-400);
}

.color-option.red { background: var(--event-red); }
.color-option.blue { background: var(--event-blue); }
.color-option.green { background: var(--event-green); }
.color-option.yellow { background: var(--event-yellow); }
.color-option.purple { background: var(--event-purple); }
.color-option.cyan { background: var(--event-cyan); }

textarea.mi-input {
  resize: vertical;
  min-height: 80px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--mi-gray-200);
}

.modal-footer .mi-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    padding: 20px;
  }
}
</style>
