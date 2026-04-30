# Activity Calendar

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/frontend-Vue3-green.svg" alt="Frontend">
  <img src="https://img.shields.io/badge/storage-LocalStorage-orange.svg" alt="Storage">
</p>

<p align="center">
  <b>活动日历管理系统</b>
</p>

<p align="center">
  一个简洁、高效的活动日历管理工具，帮助用户追踪和管理公司各类活动。
</p>

---

## ✨ 功能特性

- 📅 **双维度日历视图** - 支持月视图和年视图切换
- 🔄 **流畅的导航体验** - 左右滑动/点击切换时间周期
- ➕ **活动管理** - 快速添加、编辑、删除活动
- 📊 **时间范围选择** - 支持跨天活动标记
- 💾 **本地数据存储** - 无需后端，数据保存在浏览器本地
- 📱 **响应式设计** - 适配桌面和移动设备

## 🚀 快速开始

### 在线演示

👉 [Live Demo](https://your-username.github.io/activity-calendar)
<img width="1440" height="900" alt="01-login" src="https://github.com/user-attachments/assets/0d2a21d2-26df-4d3c-9480-fd5ee3d15318" />
<img width="1440" height="988" alt="08-may-with-events" src="https://github.com/user-attachments/assets/9a5c47c3-1149-47f8-b7f2-2a3b01ce5c34" />
<img width="1440" height="988" alt="09-june-with-events" src="https://github.com/user-attachments/assets/b5f68547-9bc7-43f3-86ec-db28b0a6d20a" />
<img width="1440" height="1926" alt="10-year-view-with-events" src="https://github.com/user-attachments/assets/b1964dd1-c2df-4f01-9bff-3673b4dbb621" />


### 本地运行

```bash
# 克隆仓库
git clone https://github.com/your-username/activity-calendar.git

# 进入项目目录
cd activity-calendar

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📖 使用指南

### 1. 登录

系统使用模拟登录，输入任意用户名即可进入。

### 2. 日历视图

- **月视图**: 显示单月的活动分布
- **年视图**: 显示整年的活动概览
- **切换**: 点击左右箭头或滑动切换月份/年份

### 3. 添加活动

1. 点击「新增活动」按钮
2. 在日历上选择开始日期和结束日期
3. 输入活动名称
4. 选择活动颜色标识
5. 保存

### 4. 管理活动

- 点击已标记的活动可查看详情
- 支持编辑和删除操作

## 🛠️ 技术栈

- **框架**: Vue 3 + Composition API
- **构建工具**: Vite
- **样式**: CSS3 + Flex/Grid
- **存储**: LocalStorage
- **图标**: Heroicons

## 📁 项目结构

```
activity-calendar/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 组件
│   │   ├── Calendar.vue   # 日历主组件
│   │   ├── MonthView.vue  # 月视图
│   │   ├── YearView.vue   # 年视图
│   │   ├── EventModal.vue # 活动弹窗
│   │   └── Login.vue      # 登录页
│   ├── composables/        # 组合式函数
│   │   ├── useCalendar.js # 日历逻辑
│   │   ├── useEvents.js   # 活动管理
│   │   └── useStorage.js  # 本地存储
│   ├── styles/            # 样式文件
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 Vue 3 风格指南
- 提交信息使用中文或英文，描述清晰

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢所有贡献者的支持

---

<p align="center">
  Made with ❤️
</p>
