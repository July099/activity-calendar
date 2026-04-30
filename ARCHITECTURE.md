# 架构文档

## 项目概述

活动日历是一个纯前端的活动管理系统，使用 Vue 3 + Vite 构建，数据通过 LocalStorage 持久化存储。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式**: 原生 CSS3
- **存储**: LocalStorage
- **代码规范**: ESLint + Prettier

## 架构设计

### 目录结构

```
src/
├── components/          # Vue 组件
│   ├── Login.vue       # 登录页
│   ├── Calendar.vue    # 日历主容器
│   ├── MonthView.vue   # 月视图组件
│   ├── YearView.vue    # 年视图组件
│   ├── EventModal.vue  # 新增活动弹窗
│   └── EventDetailModal.vue  # 活动详情弹窗
├── composables/        # 组合式函数
│   ├── useCalendar.js  # 日历状态管理
│   └── useEvents.js    # 活动数据管理
└── styles/            # 全局样式
    └── main.css       # 主样式文件
```

### 组件架构

```
App.vue
├── Login.vue (未登录状态)
└── Calendar.vue (已登录状态)
    ├── MonthView.vue / YearView.vue
    ├── EventModal.vue
    └── EventDetailModal.vue
```

### 状态管理

采用组合式函数 (Composables) 管理状态：

#### useCalendar

管理日历相关状态：
- `currentDate`: 当前显示的日期
- `viewMode`: 视图模式 ('month' | 'year')
- 导航方法: prevMonth, nextMonth, prevYear, nextYear

#### useEvents

管理活动数据：
- `events`: 活动列表（响应式）
- CRUD 操作: addEvent, updateEvent, deleteEvent
- 数据持久化: 自动同步到 LocalStorage

### 数据流

```
用户操作 → 组件事件 → Composable 方法 → LocalStorage
                ↓
            响应式更新 → UI 重新渲染
```

### 数据模型

#### Event 对象

```typescript
interface Event {
  id: string           // 唯一标识
  title: string        // 活动名称
  startDate: string    // 开始日期 (YYYY-MM-DD)
  endDate: string      // 结束日期 (YYYY-MM-DD)
  color: string        // 颜色标识 (red|blue|green|yellow|purple|cyan)
  description?: string // 备注（可选）
  createdAt: string    // 创建时间 (ISO 8601)
  updatedAt?: string   // 更新时间 (ISO 8601)
}
```

### 视图设计

#### 月视图 (MonthView)

- 6x7 网格显示 42 天（包含前后月份）
- 显示活动标记（彩色圆点）
- 支持点击日期选择
- 左右箭头切换月份

#### 年视图 (YearView)

- 3x4 网格显示 12 个月
- 迷你日历展示当月概览
- 显示每月活动数量
- 点击月份切换到月视图

### 样式系统

#### CSS 变量

```css
:root {
  --primary: #FF6900;        /* 主色调 */
  --gray-100: #F5F5F5;       /* 背景色 */
  --text: #333333;           /* 主要文字 */
  /* ... */
}
```

#### 组件样式规范

- 使用 scoped CSS
- BEM 命名规范
- 响应式断点: 768px, 480px

### 存储策略

```
LocalStorage Key: activity-calendar-events
Value: JSON.stringify(Event[])
```

- 自动保存：监听 events 变化
- 自动加载：初始化时读取
- 错误处理：try-catch 包裹

## 性能优化

1. **响应式优化**: 使用 computed 缓存计算结果
2. **渲染优化**: 使用 v-show 替代 v-if 频繁切换
3. **存储优化**: 防抖保存，避免频繁写入

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## 扩展建议

未来可扩展的功能：

1. **数据导出**: JSON/CSV 导出活动数据
2. **数据同步**: 云端同步（需要后端）
3. **提醒功能**: 浏览器通知 API
4. **主题切换**: 深色模式支持
5. **多语言**: i18n 国际化
