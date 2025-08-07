import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Typography, Spin, Alert, Space, Badge } from 'antd';
import { ToolOutlined, ApiOutlined, MessageOutlined, FileTextOutlined } from '@ant-design/icons';
import ApiService from '../services/api';
import { DifyTool, ToolType, ToolStatus } from '../types';

const { Title, Paragraph, Text } = Typography;

const ToolsList: React.FC = () => {
  const [tools, setTools] = useState<DifyTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      setError(null);
      const toolsData = await ApiService.getTools();
      setTools(toolsData);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || '加载工具列表失败');
    } finally {
      setLoading(false);
    }
  };

  const getToolTypeIcon = (type: ToolType) => {
    switch (type) {
      case ToolType.WORKFLOW:
        return <ApiOutlined />;
      case ToolType.CHAT:
        return <MessageOutlined />;
      case ToolType.COMPLETION:
        return <FileTextOutlined />;
      default:
        return <ToolOutlined />;
    }
  };

  const getToolTypeColor = (type: ToolType) => {
    switch (type) {
      case ToolType.WORKFLOW:
        return 'blue';
      case ToolType.CHAT:
        return 'green';
      case ToolType.COMPLETION:
        return 'orange';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: ToolStatus) => {
    switch (status) {
      case ToolStatus.ACTIVE:
        return 'success';
      case ToolStatus.INACTIVE:
        return 'default';
      case ToolStatus.DRAFT:
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: ToolStatus) => {
    switch (status) {
      case ToolStatus.ACTIVE:
        return '运行中';
      case ToolStatus.INACTIVE:
        return '已停用';
      case ToolStatus.DRAFT:
        return '草稿';
      default:
        return status;
    }
  };

  const getTypeText = (type: ToolType) => {
    switch (type) {
      case ToolType.WORKFLOW:
        return '工作流';
      case ToolType.CHAT:
        return '对话';
      case ToolType.COMPLETION:
        return '补全';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">加载工具列表中...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="加载失败"
        description={error}
        type="error"
        showIcon
        action={
          <button onClick={loadTools} style={{ border: 'none', background: 'none', color: '#1890ff', cursor: 'pointer' }}>
            重试
          </button>
        }
      />
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <ToolOutlined style={{ marginRight: 8 }} />
          AI工具列表
        </Title>
        <Paragraph type="secondary">
          当前平台集成的所有AI工具，您可以查看每个工具的详细信息和使用状态。
        </Paragraph>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Space>
          <Badge count={tools.length} showZero>
            <Tag>全部工具</Tag>
          </Badge>
          <Badge count={tools.filter(t => t.status === ToolStatus.ACTIVE).length} showZero>
            <Tag color="success">运行中</Tag>
          </Badge>
          <Badge count={tools.filter(t => t.tool_type === ToolType.WORKFLOW).length} showZero>
            <Tag color="blue">工作流</Tag>
          </Badge>
          <Badge count={tools.filter(t => t.tool_type === ToolType.CHAT).length} showZero>
            <Tag color="green">对话</Tag>
          </Badge>
        </Space>
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={tools}
        renderItem={(tool) => (
          <List.Item>
            <Card
              title={
                <Space>
                  {getToolTypeIcon(tool.tool_type)}
                  <span>{tool.name}</span>
                </Space>
              }
              extra={
                <Tag color={getStatusColor(tool.status)}>
                  {getStatusText(tool.status)}
                </Tag>
              }
              actions={[
                <Tag color={getToolTypeColor(tool.tool_type)} key="type">
                  {getTypeText(tool.tool_type)}
                </Tag>
              ]}
              hoverable
            >
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {tool.description}
              </Paragraph>
              
              <div style={{ marginTop: 12, fontSize: '12px', color: '#8c8c8c' }}>
                <div>工具ID: {tool.id}</div>
                {tool.dify_app_id && (
                  <div>Dify应用ID: {tool.dify_app_id}</div>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />

      {tools.length === 0 && (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <ToolOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">暂无可用工具</Text>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ToolsList;