import { useState } from 'react';
import { Modal, Button, Form, Input, Message } from '@arco-design/web-react';

const FormItem = Form.Item;

function SeekerInfoModal({visible, setVisible, seekerInfo}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  form.setFieldsValue({
      headline: seekerInfo.headline,
      description: seekerInfo.description,
      location: seekerInfo.location
  });

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
  return (
    <div>
      <Modal
        title='Edit Profile Information'
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
          <FormItem label='Headline' field='headline'>
            <Input placeholder='Headline' size="large"/>
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
        </Form>
      </Modal>
    </div>
  );
}

export default SeekerInfoModal