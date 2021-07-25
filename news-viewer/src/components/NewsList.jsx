import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import NewsItem from './NewsItem';

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async 를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);

      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=bdbc46c5a1ae48d78d42c2c143a877ef`,
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [category]);

  // 로딩 중 일 때
  if (loading) return <NewsListBlock>로딩 중...</NewsListBlock>;

  // 아직 articles 값이 설정되어 있지 않을 때
  if (!articles) return null;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default NewsList;
