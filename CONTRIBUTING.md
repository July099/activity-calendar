# 贡献指南

感谢你对 Activity Calendar 项目的关注！我们欢迎各种形式的贡献。

## 🎯 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议，请通过 [Issue](https://github.com/your-username/activity-calendar/issues) 提交：

1. 使用清晰的标题描述问题
2. 详细描述问题复现步骤
3. 提供浏览器版本和操作系统信息
4. 如有截图，请附上

### 提交代码

1. **Fork 仓库** - 点击右上角的 Fork 按钮
2. **克隆到本地**
   ```bash
   git clone https://github.com/your-username/activity-calendar.git
   ```
3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/issue-description
   ```
4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   git push origin feature/your-feature-name
   ```
5. **创建 Pull Request** - 在 GitHub 上提交 PR

## 📝 提交信息规范

使用以下前缀：

- `feat:` - 新功能
- `fix:` - 修复 bug
- `docs:` - 文档更新
- `style:` - 代码格式调整（不影响功能）
- `refactor:` - 代码重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建/工具相关

示例：
```
feat: 添加年视图活动统计功能
fix: 修复跨月活动显示异常问题
docs: 更新 README 使用说明
```

## 🎨 代码规范

### Vue 组件规范

```vue
<template>
  <!-- 模板代码 -->
</template>

<script setup>
// Composition API 风格
import { ref, computed } from 'vue'

// 组合式函数引入
import { useCalendar } from '@/composables/useCalendar'

// 响应式数据
const currentDate = ref(new Date())

// 计算属性
const formattedDate = computed(() => {
  return formatDate(currentDate.value)
})

// 方法
const handleClick = () => {
  // 处理逻辑
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

### JavaScript 规范

- 使用 ES6+ 语法
- 优先使用 `const`，必要时使用 `let`，避免 `var`
- 使用严格相等 `===` 和 `!==`
- 函数使用驼峰命名，常量使用全大写下划线分隔

### CSS 规范

- 使用 CSS 变量管理主题色
- 类名使用 kebab-case
- 避免过深的选择器嵌套

## 🧪 测试

提交前请确保：

1. 代码可以正常构建：`npm run build`
2. 没有 ESLint 错误：`npm run lint`
3. 功能在 Chrome、Firefox、Safari 中测试通过

## 📋 开发计划

查看 [Projects](https://github.com/your-username/activity-calendar/projects) 了解当前开发进度。

## 💬 交流

- 一般讨论：使用 [Discussions](https://github.com/your-username/activity-calendar/discussions)
- 实时交流：加入我们的微信群（扫码添加）

## 🏆 贡献者

感谢所有为项目做出贡献的人！

<a href="https://github.com/your-username/activity-calendar/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/activity-calendar" />
</a>

---

再次感谢你的贡献！🎉
