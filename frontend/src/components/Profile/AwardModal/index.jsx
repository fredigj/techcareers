import React from 'react';
import { Modal, Select, Form, Input, Message, DatePicker, Checkbox } from '@arco-design/web-react';

const FormItem = Form.Item;

function AwardModal({visible, setVisible, isEdit, awardInfo}) {

  console.log(isEdit, awardInfo);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const [isCurrent, setIsCurrent] = React.useState(false);

  if (isEdit) {
    form.setFieldsValue({
      ...awardInfo
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

  return (
    <div>
      <Modal
        title={isEdit ? 'Edit Award Information' : 'Add Award Information'}
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
          <FormItem label='Institution' field='institution'>
            <Input placeholder='Institution' size="large"/>
          </FormItem>
          <FormItem label='Description' field='description'>
            <Input.TextArea
                placeholder='Description...'
                style={{ minHeight: 64}}
            />
          </FormItem>      
          <FormItem
              label='Issue date'
              field='issue_date'
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
              label='Expiry date'
              field='expiry_date'>
                    <DatePicker style={{ width: '100%'}} disabled={isCurrent} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default AwardModal