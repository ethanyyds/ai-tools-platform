import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layout from './components/Layout';
import CreativityGenerator from './pages/CreativityGenerator';
import ToolsList from './pages/ToolsList';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <div className="app-container">
          <Layout>
            <Routes>
              <Route path="/" element={<CreativityGenerator />} />
              <Route path="/creativity" element={<CreativityGenerator />} />
              <Route path="/tools" element={<ToolsList />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;