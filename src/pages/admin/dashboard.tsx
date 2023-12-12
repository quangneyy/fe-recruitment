import { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Divider, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { callFetchCompany, callFetchUser, callFetchJob } from '@/config/api';
import { ICompany } from '@/types/backend';
import styles from 'styles/client.module.scss';

const DashboardPage = () => {
    const [displayCompany, setDisplayCompany] = useState<ICompany[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalCompanies, setTotalCompanies] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState('sort=-updatedAt');

    useEffect(() => {
        fetchDashboardData();
    }, [current, pageSize, filter, sortQuery]);

    const fetchDashboardData = async () => {
        setIsLoading(true);

        // Lấy tổng số công ty, người dùng và công việc
        const [companyRes, userRes, jobRes] = await Promise.all([
            callFetchCompany(''),
            callFetchUser(''),
            callFetchJob('')
        ]);

        if (companyRes && companyRes.data) {
            setTotalCompanies(companyRes.data.meta.total);
        }

        if (userRes && userRes.data) {
            setTotalUsers(userRes.data.meta.total);
        }

        if (jobRes && jobRes.data) {
            setTotalJobs(jobRes.data.meta.total);
        }

        // Lấy thông tin công ty được hiển thị
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const displayCompanyRes = await callFetchCompany(query);
        if (displayCompanyRes && displayCompanyRes.data) {
            setDisplayCompany(displayCompanyRes.data.result);
        }

        setIsLoading(false);
    };

    const formatter = (value: number | string) => <CountUp end={Number(value)} separator="," />;

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrent(page);
    };

    const navigateToCompanyDetails = (companyId: string) => {
        navigate(`/company/${companyId}`);
    };

    return (
        <div>
            {/* Hiển thị tổng số công ty, người dùng và công việc */}
            <Row gutter={[20, 20]} justify="center" style={{ marginBottom: '20px' }}>
                <Col span={24} md={8}>
                    <Card title="Tổng số công ty" bordered={false}>
                        <Statistic title="Tổng số công ty" value={totalCompanies} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Tổng số người dùng" bordered={false}>
                        <Statistic title="Tổng số người dùng" value={totalUsers} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Tổng số công việc" bordered={false}>
                        <Statistic title="Tổng số công việc" value={totalJobs} formatter={formatter} />
                    </Card>
                </Col>
            </Row>

            {/* Hiển thị từng công ty */}
            <Row gutter={[20, 20]} justify="center">
                {displayCompany?.map(item => (
                    <Col key={item._id} span={24} md={6}>
                        <Card
                            style={{
                                height: 350,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '20px', 
                            }}
                            hoverable
                           
                        >
                            <div className={styles['card-customize']} style={{ flex: 1, display: 'flex', justifyContent: 'center', height: '200px' }}>
                                <img
                                    alt="example"
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.logo}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <div style={{ textAlign: 'center', padding: '10px' }}>
                                <Divider />
                                <h3 style={{ margin: 0 }}>{item.name}</h3>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Phân trang */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={totalCompanies}
                    onChange={handlePageChange}
                    showSizeChanger
                    onShowSizeChange={(current, newSize) => setPageSize(newSize)}
                    showQuickJumper
                    showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
