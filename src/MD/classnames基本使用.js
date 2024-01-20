// classnames 是一个非常受欢迎的 JavaScript 库，它用于在 React 组件中方便地处理 CSS 类名。这个库可以帮助你根据组件的状态或属性来动态添加或删除类名。下面是如何在 React 项目中集成和使用 classnames 库的步骤：
// 安装 classnames
// 首先，你需要在你的项目中安装 classnames 库。使用 npm 或 yarn 来安装它：
// npm install classnames
// # 或者
// yarn add classnames

// 在 React 组件中使用 classnames
// 在你的 React 组件中导入 classnames：
import classNames from 'classnames';

// 然后，你可以使用它来动态地构建类名字符串。例如，假设你有一个按钮组件，它的样式取决于它是否被激活：
function MyButton ({ isActive }) {
    const buttonClass = classNames({
        'btn': true,
        'btn-active': isActive,
        'btn-inactive': !isActive
    });

    return <button className={buttonClass}>Click me</button>;
}

// 在这个例子中，btn 类始终被应用，而 btn - active 只在 isActive 为 true 时应用，btn - inactive 只在 isActive 为 false 时应用。
// classnames 的其他用法
// classnames 还支持多种格式和用法，例如：

// 1.使用数组：

const buttonClass = classNames(['btn', { 'btn-active': isActive }]);


// 2.使用字符串和对象的混合：

const buttonClass = classNames('btn', { 'btn-active': isActive });


// 3.根据条件应用多个类名：

const buttonClass = classNames({
    'btn': true,
    'btn-primary': isPrimary,
    'btn-secondary': !isPrimary
});

// 这种灵活性使得 classnames 在管理复杂组件的类名时变得非常有用。它是一个轻量级的库，但大大简化了类名的动态处理，特别是在处理多个条件性类名时。使用 classnames，你可以更容易地保持你的 React 组件的可读性和可维护性。