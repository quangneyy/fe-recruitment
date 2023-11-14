// FeaturedArticles.js

import React, { useState, useEffect } from 'react';
import { Card, Col, Empty, Row, Spin } from 'antd';
import styles from 'styles/client.module.scss';

interface FeaturedArticle {
  id: number;
  content: string;
  image: string;
  link: string;
}

const featuredArticlesData: FeaturedArticle[] = [
  {
    id: 1,
    content: '10 điều cần chú ý để có mẫu CV chuyên nghiệp',
    image: 'public/images/mau-cv-chuyen-nghiep-checklist-thumb-blog-vippro.jpg',
    link: 'https://itviec.com/blog/checklist-mau-cv-chuyen-nghiep-cho-ung-vien-it?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com',
  },
  {
    id: 2,
    content: 'Cách viết CV với top 20+ prompt ChatGPT hay nhất',
    image: 'public/images/viet-cv-it-bang-chatgpt-vippro.jpg',
    link: 'https://itviec.com/blog/cach-viet-cv-bang-chatgpt/?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com',
  },
  {
    id: 3,
    content: 'Mẫu CV chuẩn cách viết mô tả Dự án dành cho chuyên gia IT',
    image: 'public/images/mau-cv-chuan-blog-thumb-vippro.jpg',
    link: 'https://itviec.com/blog/mau-cv-chuan-trinh-bay-du-an-it/?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com',
  },
  {
    id: 4,
    content: 'Vùng an toàn của Developer và 5 cách thoát ra để thành công hơn trong sự nghiệp',
    image: 'public/images/vung-an-toan-thumbnail.png',
    link: 'https://itviec.com/blog/vung-an-toan/',
  },
  // Thêm các bài viết khác ở đây
];

const FeaturedArticles = () => {
  const [displayArticles, setDisplayArticles] = useState<FeaturedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = () => {
    setIsLoading(true);
    setDisplayArticles(featuredArticlesData);
    setIsLoading(false);
  };

  return (
    <div className={styles['featured-articles-section']}>
      <div className={styles['featured-articles-content']}>
        <Spin spinning={isLoading} tip="Loading...">
          <h2 className={styles['title']}>Bài viết nổi bật</h2>
          <Row gutter={[16, 16]}>
            {displayArticles.map((article) => (
              <Col key={article.id} xs={24} sm={12} md={8} lg={6}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <Card
                    className={styles['featured-card']}
                    hoverable
                    cover={<img alt="featured" src={article.image} />}
                  >
                    <div className={styles['featured-content']}>
                      <p>{article.content}</p>
                    </div>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
          {(!displayArticles || displayArticles.length === 0) && !isLoading && (
            <div className={styles['empty']}>
              <Empty description="Không có bài viết nổi bật" />
            </div>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default FeaturedArticles;
