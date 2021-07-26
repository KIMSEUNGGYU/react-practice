import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import NewsItem from './NewsItem';
import usePromise from '../lib/usePromise';

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=bdbc46c5a1ae48d78d42c2c143a877ef`,
    );
  }, [category]);

  // 로딩 중 일 때
  if (loading) return <NewsListBlock>로딩 중...</NewsListBlock>;

  // 아직 articles 값이 설정되어 있지 않을 때
  if (!response) return null;

  if (error) return <NewsListBlock>에러 발생!</NewsListBlock>;

  const { articles } = response.data;
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
