import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ICompany, IJob } from "@/types/backend";
import { callFetchCompanyById,callFetchJobByCompany } from "@/config/api";
import styles from 'styles/client.module.scss';
import parse from 'html-react-parser';
import { Col, Divider, Row, Skeleton } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { convertSlug } from "@/config/utils";


const ClientCompanyDetailPage = (props: any) => {
    const [companyDetail, setCompanyDetail] = useState<ICompany | null>(null);
    const [companyJobs, setCompanyJobs] = useState<IJob[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // job id

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true)
                const res = await callFetchCompanyById(id);
                if (res?.data) {
                    setCompanyDetail(res.data)
                }                
                setIsLoading(false)
            }
        }
        init();
    }, [id]);
    useEffect(() => {
        const init = async () => {
          if (id) {
            setIsLoading(true);
            const res = await callFetchJobByCompany(id);
            if (res?.data) {
              setCompanyJobs(res.data); 
            }
            setIsLoading(false);
          }
        };
        init();
      }, [id]);
      const handleViewDetailJob = (item: IJob) => {
        const slug = convertSlug(item.name);
        navigate(`/job/${slug}?id=${item._id}`)
    }
    return (
        <div className={`${styles["container"]} ${styles["detail-job-section"]}`}>
            {isLoading ?
                <Skeleton />
                :
                <Row gutter={[20, 20]}>
                    {companyDetail && companyDetail._id &&
                        <>
                            <Col span={24} md={16}>
                            <div className={styles["company-info"]}>
                                <div>
                                    <img
                                        alt="example"
                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${companyDetail?.logo}`}
                                    />
                                </div>
                                <div className={styles["header"]}>
                                    {companyDetail.name}
                                </div>
                            </div>
                                <div className={styles["location"]}>
                                    <EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{(companyDetail?.address)}
                                </div>
                                <Divider />
                                {parse(companyDetail?.description ?? "")}
                            </Col>
                            <Col span={24} md={8}>
                                <div className={styles["company"]}>
                                    <div className={styles["jobs"]}>
                                        {companyJobs && companyJobs.length > 0 ? (
                                            <>
                                            <h2 className={styles["job-list-title"]}>{`${companyJobs.length} Công Việc`}</h2>
                                            <div className={styles["job-list"]}>  
                                                                                       
                                                {companyJobs.map((job) => (
                                                <div key={job._id} className={`${styles["job-container"]} ${styles["red-border"]}`}onClick={() => handleViewDetailJob(job)}>
                                                    <div className={styles["job-header"]}>
                                                    <h2>{job.name}</h2>
                                                    <div className={styles["company"]}>
                                                <div>
                                                    <img
                                                    alt="example"
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${companyDetail?.logo}`}
                                                    className={styles["company-logo"]}
                                                    />
                                                </div>
                                                <div>{companyDetail?.name}</div>
                                                </div>
                                                    </div>
                                                    <p>Kỹ Năng: {job.skills.join(', ')}</p>
                                                    <p>Địa Điểm: {job.location}</p>
                                                    <p>Mức Lương: ${job.salary}</p>
                                                    <p>Số Lượng: {job.quantity}</p>
                                                    <p>Level: {job.level}</p>
                                                    
                                                </div>
                                                ))}
                                            </div>
                                            </>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                    </div>        
                            </Col>
                        </>
                    }
                </Row>
            }
        </div>
    )
}
export default ClientCompanyDetailPage;