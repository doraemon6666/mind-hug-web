import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from '../src/pages/Login'
import RouterConfig from "./router";  // 导入路由配置
function App() {
  return (
    <Router>
      <RouterConfig />  {/* 使用路由配置 */}
  </Router>
  );
}

export default App;
