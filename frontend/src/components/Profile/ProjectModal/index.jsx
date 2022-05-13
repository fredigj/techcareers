import React from 'react';
import { Modal, Select, Form, Input, Message, DatePicker, Checkbox } from '@arco-design/web-react';
import { useAddSeekerProjectMutation, useUpdateSeekerProjectMutation } from '../../../redux/services/profile';

const FormItem = Form.Item;

function ProjectModal({visible, setVisible, isEdit, projectInfo, refetch}) {
  const [addProject, addProjectReq] = useAddSeekerProjectMutation();
  const [updateProject, updateProjectReq] = useUpdateSeekerProjectMutation();

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const [isCurrent, setIsCurrent] = React.useState(false);

  React.useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...projectInfo
      });
    } else {
      form.clearFields();
    }
  }, [visible])

  async function onOk() {
    form.validate().then((res) => {
      if(isEdit){
        const body = form.getFieldsValue();
        updateProject({body, id: projectInfo.id}).unwrap().finally(() => {
          setVisible(false);
          refetch();
        });
      }else{
        const body = form.getFieldsValue();
        addProject(body).unwrap().finally(() => {
          setVisible(false);
          refetch();
        });
      }

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
        title={isEdit ? 'Edit Project Information' : 'Add Project Information'}
        visible={visible}
        onOk={onOk}
        confirmLoading={addProjectReq.isLoading || updateProjectReq.isLoading}
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
          <FormItem label='Description' field='description'>
            <Input.TextArea
                placeholder='Description...'
                style={{ minHeight: 64}}
            />
          </FormItem>
          <FormItem label='Project URL' field='url'>
            <Input placeholder='Project URL' size="large"/>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default ProjectModal