import React from 'react';
import { Modal, Select, Form, Input, Message, DatePicker, Checkbox } from '@arco-design/web-react';

const FormItem = Form.Item;

function ExperienceModal({visible, setVisible, isEdit, educationInfo}) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const [isCurrent, setIsCurrent] = React.useState(false);

  React.useEffect(() => {
    form.setFieldsValue({
      // headline: educationInfo.headline,
      // description: educationInfo.description,
      // location: educationInfo.location
    });
  }, [])

  function onOk() {
    form.validate().then((res) => {
      setConfirmLoading(true);
      setTimeout(() => {
        Message.success('Success !');
        setVisible(false);
        setConfirmLoading(false);
      }, 1500);
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

  const options = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Volunteer'];

  return (
    <div>
      <Modal
        title={isEdit ? 'Edit Experience Information' : 'Add Experience Information'}
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          layout="vertical"
          form={form}
          labelCol={{ style: { flexBasis: 90 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 90px)' } }}
        >
          <FormItem label='Title' field='title'>
            <Input placeholder='Title' size="large"/>
          </FormItem>
          <FormItem label='Company' field='company'>
            <Input placeholder='Company' size="large"/>
          </FormItem>
          <FormItem label='Employment type' field='employment_type'>
            <Select
              placeholder='Select the employment type'
              allowClear
            >
              {options.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='Description' field='description'>
            <Input.TextArea
                placeholder='Description...'
                style={{ minHeight: 64}}
            />
          </FormItem>
          <FormItem label='Location' field='location'>
            <Input placeholder='Location' size="large"/>
          </FormItem>
          <FormItem
              label='Start date'
              field='start_date'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Date of Birth is required',
              //   },
              // ]}
            >
                    <DatePicker style={{ width: '100%'}} />
          </FormItem>
          <FormItem field='is_current' shouldUpdate>
            <Checkbox onClick={() => setIsCurrent(!isCurrent)}>This is my current job</Checkbox>
          </FormItem>
          <FormItem
              label='End date'
              field='end_date'>
                    <DatePicker style={{ width: '100%'}} disabled={isCurrent} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default ExperienceModal