import React from 'react';
import { Modal, Select, Form, Input, Message, DatePicker, Checkbox } from '@arco-design/web-react';
import { useAddSeekerAwardMutation, useUpdateSeekerAwardMutation } from '../../../redux/services/profile';

const FormItem = Form.Item;

function AwardModal({visible, setVisible, isEdit, awardInfo, refetch}) {

  const [addAward, addAwardReq] = useAddSeekerAwardMutation();
  const [updateAward, updateAwardReq] = useUpdateSeekerAwardMutation();

  const [form] = Form.useForm();

  const [isCurrent, setIsCurrent] = React.useState(false);

  React.useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...awardInfo
      });
    } else {
      form.clearFields();
    }
  }, [visible])

  async function onOk() {
    form.validate().then((res) => {
      if(isEdit){
        const body = form.getFieldsValue();
        updateAward({body, id: awardInfo.id}).unwrap().finally(() => {
          setVisible(false);
          refetch();
        });
      }else{
        const body = form.getFieldsValue();
        addAward(body).unwrap().finally(() => {
          setVisible(false);
          refetch();
        });
      }
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
        confirmLoading={addAwardReq.isLoading || updateAwardReq.isLoading}
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