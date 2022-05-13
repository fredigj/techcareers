import React from 'react';
import { Modal, Button, Form, Input, Message } from '@arco-design/web-react';
import { useUpdateSeekerProfileMutation } from '../../../redux/services/profile';

const FormItem = Form.Item;

function SeekerInfoModal({visible, setVisible, seekerInfo, refetch}) {
  const [form] = Form.useForm();

  const [updateSeekerProfile, updateSeekerProfileReq] = useUpdateSeekerProfileMutation();

  if(updateSeekerProfileReq.isUninitialized){
        form.setFieldsValue({
        headline: seekerInfo.headline,
        description: seekerInfo.description,
        location: seekerInfo.location
    });
  }

    function onOk() {
        form.validate().then((res) => {
            const body = form.getFieldsValue();
            updateSeekerProfile(body).unwrap().finally(() => {setVisible(false); refetch();});
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
        confirmLoading={updateSeekerProfileReq.isLoading}
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