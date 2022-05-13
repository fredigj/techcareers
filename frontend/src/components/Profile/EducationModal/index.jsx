import React from 'react';
import { Modal, Select, Form, Input, Message, DatePicker, Checkbox } from '@arco-design/web-react';

const FormItem = Form.Item;

function EducationModal({visible, setVisible, isEdit, educationInfo}) {

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const [isCurrent, setIsCurrent] = React.useState(false);

  if (isEdit) {
    form.setFieldsValue({
      ...educationInfo
    });
  } else {
    form.clearFields();
  }

  async function onOk() {
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

  const options = ['Bachelor of Science', 'Bachelor of Arts', 'Master of Science', 'Master of Arts', 'Master of Engineering', 'Associate of Arts', 'Associate of Science', 'High School Diploma', 'Professional' ];

  return (
    <div>
      <Modal
        title={isEdit ? 'Edit Education Information' : 'Add Education Information'}
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
          <FormItem label='Field Of Study' field='field_of_study'>
            <Input placeholder='Field Of Study' size="large"/>
          </FormItem>
          <FormItem label='Institution' field='institution'>
            <Input placeholder='Institution' size="large"/>
          </FormItem>
          <FormItem label='Degree' field='degree'>
            <Select
              placeholder='Select the degree'
              allowClear
            >
              {options.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='Grade' field='grade'>
            <Input placeholder='Grade' size="large"/>
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

export default EducationModal