import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Company.module.css'
import SeekerInfoModal from '../../components/Profile/SeekerInfoModal';
import { useParams } from 'react-router-dom';
import { useGetCompanyDetailsQuery } from '../../redux/services/recruiter';
import Company from '../../components/Company';

const CompanyContainer = () => {
    const id = useParams().id;
    // const user = useUserInfo();

    const {data: companyData, isLoading, refetch} = useGetCompanyDetailsQuery(id);
    // console.log(seekerProfileData);

    const [seekerInfoModal, setSeekerInfoModal] = React.useState(false);
    
    return (
        !isLoading && (
        <div>
            <Navbar/>
            {/* <SeekerInfoModal visible={seekerInfoModal} setVisible={setSeekerInfoModal} seekerInfo={seekerProfileData.seeker} refetch={refetch}s/> */}
            <Company companyData={companyData}/>
        </div>
        )
    )
}

export default CompanyContainer