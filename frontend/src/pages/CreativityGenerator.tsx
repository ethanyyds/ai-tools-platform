import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Spin, Divider, Space } from 'antd';
import { BulbOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ApiService from '../services/api';
import { ToolExecuteResponse } from '../types';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface CreativityResult {
  workflow_run_id: string;
  task_id: string;
  data: {
    outputs?: {
      text?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
}

const CreativityGenerator: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreativityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { topic: string; context: string }) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response: ToolExecuteResponse = await ApiService.generateCreativity({
        topic: values.topic,
        context: values.context || '',
      });

      if (response.success && response.data) {
        setResult(response.data as CreativityResult);
      } else {
        setError(response.error || '生成失败，请重试');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || '网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (data: any): string => {
    if (typeof data === 'string') {
      return data;
    }
    
    if (data?.outputs?.text) {
      return data.outputs.text;
    }
    
    // 尝试提取其他可能的文本字段
    const textFields = ['result', 'answer', 'output', 'content'];
    for (const field of textFields) {
      if (data?.[field] && typeof data[field] === 'string') {
        return data[field];
      }
      if (data?.outputs?.[field] && typeof data.outputs[field] === 'string') {
        return data.outputs[field];
      }
    }
    
    // 如果没有找到标准文本字段，返回格式化的JSON
    return JSON.stringify(data, null, 2);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <BulbOutlined style={{ marginRight: 8, color: '#faad14' }} />
          六顶思考帽创意生成器
        </Title>
        <Paragraph type="secondary">
          基于六顶思考帽方法论，从多个维度分析问题并生成创新性解决方案。
          请输入您想要探讨的主题，系统将从不同角度为您提供全面的分析和创意建议。
        </Paragraph>
      </div>

      <Card title="创意生成" style={{ marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="topic"
            label="主题"
            rules={[{ required: true, message: '请输入要分析的主题' }]}
          >
            <Input
              placeholder="例如：如何提高团队工作效率"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="context"
            label="背景描述（可选）"
          >
            <TextArea
              placeholder="提供更多背景信息可以帮助生成更精准的建议..."
              rows={4}
              disabled={loading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              icon={loading ? <LoadingOutlined /> : <BulbOutlined />}
            >
              {loading ? '正在生成创意...' : '生成创意方案'}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {error && (
        <Alert
          message="生成失败"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: 24 }}
        />
      )}

      {result && (
        <Card 
          title={
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <span>创意分析结果</span>
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            <Text>{formatResult(result.data)}</Text>
          </div>
          
          <Divider />
          
          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
            <Text type="secondary">
              任务ID: {result.task_id} | 工作流ID: {result.workflow_run_id}
            </Text>
          </div>
        </Card>
      )}

      {loading && (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">正在运用六顶思考帽方法分析您的主题...</Text>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CreativityGenerator;