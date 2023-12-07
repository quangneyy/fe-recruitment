import { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Divider, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { callFetchCompany } from '@/config/api';
import { ICompany } from '@/types/backend';
import styles from 'styles/client.module.scss';

const DashboardPage = () => {
    const [displayCompany, setDisplayCompany] = useState<ICompany[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState('sort=-updatedAt');

    useEffect(() => {
        fetchCompany();
    }, [current, pageSize, filter, sortQuery]);

    const fetchCompany = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchCompany(query);
        if (res && res.data) {
            setDisplayCompany(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const formatter = (value: number | string) => <CountUp end={Number(value)} separator="," />;

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrent(page);
        // If you want to update pageSize as well, uncomment the line below:
        // setPageSize(pageSize || 8);
    };

    return (
        <div>
            <Row gutter={[20, 20]} justify="center">
                <Col span={24} md={8}>
                    <Card title="Card title" bordered={false}>
                        <Statistic title="Active Users" value={112821} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Card title" bordered={false}>
                        <Statistic title="Active Users" value={112893} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Card title" bordered={false}>
                        <Statistic title="Active Users" value={112893} formatter={formatter} />
                    </Card>
                </Col>
                {displayCompany?.map(item => (
                    <Col key={item._id} span={24} md={6}>
                        <Card
                            style={{
                                height: 350,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                    showSizeChanger
                    onShowSizeChange={(current, newSize) => setPageSize(newSize)}
                    showQuickJumper
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
