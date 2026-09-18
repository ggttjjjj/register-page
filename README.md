# Register Page

Web 开发技术第一次课课后作业：注册页面的 HTML + CSS + JS 实现。

## 功能

- 注册表单：Username / Email / Password / Confirm Password
- 输入框聚焦时边框变蓝，提示当前输入位置
- 必填项为空提交时，输入框下方红色提示 `xxx is required`
- 邮箱格式不正确时提示 `Invalid email format`
- 两次密码不一致时提示 `Passwords do not match`
- 校验通过的输入框显示绿色边框
- 密码框支持点击眼睛图标显示/隐藏密码
- 注册成功后页面上方显示 `Registration successful!` 并弹出提示框

## 项目结构

```
register-page/
├── index.html   # 页面结构
├── style.css    # 页面样式
└── script.js    # 表单校验逻辑
```

## 本地运行

用 VS Code 打开项目，安装 Live Server 插件后右键 `index.html` 选择 "Open with Live Server" 即可预览；或直接双击 `index.html` 在浏览器中打开。

## 在线访问

部署地址：（Vercel 部署后更新）
