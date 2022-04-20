import React from 'react'
import styles from './Result.module.css'
import Error from '../../../assets/signup/Error.svg'
import Success from '../../../assets/signup/Success.svg'
import { Button, Alert } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'

const Result = ({
    setStep,
    signupReq,
    secondFormRef,
    userInfo,
}) => {
    
    const navigate = useNavigate();

    const getStatusImage = () => {
        if(signupReq.isError) {
            return Error
        }
        if(signupReq.isSuccess) {
            return Success
        }
    }

    React.useEffect(() => {
        if(signupReq.isSuccess){
            setTimeout(() => {
                navigate('/');
            }, 5000);
        }
    })
    return (
        <div className={styles.body}>
            <img src={getStatusImage()} alt="error" className={styles.svg} />
            {signupReq.isSucces && (<img src={Error} alt="error" className={styles.svg} />)}
            {signupReq.isError && (<Alert
                style={{ margin: "50px 0", color: 'red' }}
                showIcon={false}
                type='error'
                title='Registration failed'
                content={signupReq.error.data.message.map(msg => <p>{msg}</p>)}
            />)}
            {signupReq.isSuccess && (<Alert
                style={{ margin: "50px 0" }}
                showIcon={false}
                type='success'
                title='Success'
                content='Your account has been registered successfully. Redirecting to dashboard...'
            />)}
            <div>
                {signupReq.isError && (<Button
                        onClick={async () => {
                            await setStep(2);
                            if(userInfo){
                                secondFormRef.current.setFieldsValue(userInfo);
                            }
                        }}
                        disabled={false}
                    >
                    Back
                    </Button>
                )}
            </div>
        </div>
  )
}

export default Result