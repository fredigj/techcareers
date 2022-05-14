import React from 'react';
import { Modal, Select, Form, Input, InputTag } from '@arco-design/web-react';
import { useCreateJobPostMutation } from '../../../redux/services/recruiter';

const FormItem = Form.Item;

function JobModal({visible, setVisible, refetch}) {

  const [form] = Form.useForm();

  const [createJobPost, createJobPostReq] = useCreateJobPostMutation();

    function onOk() {
        form.validate().then((res) => {
            const body = form.getFieldsValue();
            
            createJobPost(body).unwrap().finally(() => {
                setVisible(false);
                refetch();
            });
        });
    }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const locations = ['On-site', 'Remote', 'Hybrid'];
  const levels = ['Entry', 'Junior', 'Mid', 'Senior'];
  const employments = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Volunteer'];

  
  return (
    <div>
      <Modal
        title={'Create a job post'}
        visible={visible}
        okText="Create"
        onOk={onOk}
        confirmLoading={createJobPostReq.isLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          layout="vertical"
          form={form}
          labelCol={{ style: { flexBasis: 90 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 90px)' } }}
        >
          <FormItem label='Headline' field='headline'>
            <Input placeholder='Headline' size="large"/>
          </FormItem>
          <FormItem label='Description' field='description'>
            <Input.TextArea
                placeholder='Description...'
                style={{ minHeight: 64}}
            />
          </FormItem>
          <FormItem label='Pay range' field='pay_range'>
            <Input placeholder='Pay range' size="large"/>
          </FormItem> 
          <FormItem label='Location' field='location'>
            <Input placeholder='Location' size="large"/>
          </FormItem>
          <FormItem label='Location type' field='location_type'>
            <Select
              placeholder='Location type'
              allowClear
            >
              {locations.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='Seniority level' field='seniority_level'>
            <Select
              placeholder='Seniority level'
              allowClear
            >
              {levels.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='Employment type' field='employment_type'>
            <Select
              placeholder='Employment type'
              allowClear
            >
              {employments.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='Skillsets' field='skillsets'>
            <InputTag
              allowClear
              placeholder='Input and press Enter'
              size="large"
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default JobModal