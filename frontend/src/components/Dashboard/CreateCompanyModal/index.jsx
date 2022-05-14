import React from 'react';
import { Modal, Upload, Form, Input, DatePicker } from '@arco-design/web-react';
import { useCreateCompanyMutation } from '../../../redux/services/recruiter';

const FormItem = Form.Item;

function CreateCompanyModal({visible, setVisible, refetch}) {

  const [form] = Form.useForm();

  const [createCompany, createCompanyReq] = useCreateCompanyMutation();

    function onOk() {
        form.validate().then((res) => {
            const body = new FormData(); 
            body.append("company_image", form.getFieldValue('company_image')[0].originFile);
            body.append("name", form.getFieldValue('name'));
            body.append("short_description", form.getFieldValue('short_description'));
            body.append("long_description", form.getFieldValue('long_description'));
            body.append("email", form.getFieldValue('email'));
            body.append("establishment_year", form.getFieldValue('establishment_year'));
            body.append("website_url", form.getFieldValue('website_url'));
            body.append("location", form.getFieldValue('location'));
            createCompany(body).unwrap().finally(() => {
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

  return (
    <div>
      <Modal
        title={'Create a company'}
        visible={visible}
        okText="Create"
        onOk={onOk}
        confirmLoading={createCompanyReq.isLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          layout="vertical"
          form={form}
          labelCol={{ style: { flexBasis: 90 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 90px)' } }}
        >
          <FormItem label='Company name' field='name'>
            <Input placeholder='Company name' size="large"/>
          </FormItem>
          <FormItem label='Short description' field='short_description'>
            <Input.TextArea
                placeholder='Short description...'
                style={{ minHeight: 64}}
            />
          </FormItem>
          <FormItem label='Long description' field='long_description'>
            <Input.TextArea
                placeholder='Long description...'
                style={{ minHeight: 64}}
            />
          </FormItem>
          <FormItem label='Email' field='email'>
            <Input placeholder='Email' size="large"/>
          </FormItem> 
          <FormItem
              label='Establishment Year'
              field='establishment_year'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Date of Birth is required',
              //   },
              // ]}
            >
                    <DatePicker style={{ width: '100%'}} />
          </FormItem>
          <FormItem label='Website URL' field='website_url'>
            <Input placeholder='Website URL' size="large"/>
          </FormItem>
          <FormItem label='Location' field='location'>
            <Input placeholder='Location' size="large"/>
          </FormItem>
          <Form.Item
              label='Upload Company Image'
              field='company_image'
              triggerPropName='fileList'
            >
              <Upload
                listType='picture-card'
                autoUpload={false}
                name='files'
                limit={1}
                onPreview={(file) => {
                  Modal.info({
                    title: 'Preview',
                    content: (
                      <img
                        src={file.url || URL.createObjectURL(file.originFile)}
                        style={{ maxWidth: '100%' }}
                        alt="avatar"
                      ></img>
                    ),
                  });
                }}
              />
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateCompanyModal