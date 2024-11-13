'use client';

import { formatDate } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

const ArticlePage = () => {

  // VERSION 1 :
  // récupérer la liste des articles
  // const articles = await db.article.findMany({
  //   orderBy: {
  //     createdAt: 'asc'
  //   },
  //   include: {
  //     tags: {
  //       include: {
  //         tag : true
  //       }
  //     }
  //   }
  // });

  // VERSION 2 : Hooks
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/article');
      const data = await response.json();
      setArticles(data);
    }

    fetchArticles();
  }, [])

  return (
    <>
      <h1 className='text-2xl font-bold uppercase mb-5'>Blog</h1>
      {/* Liste des articles */}
      {articles.map((article: any) => (
        <div className='mb-6' key={article.id}>

            {/* Titre de l'article */}
            <h2 className='text-2xl font-semibold text-emerald-700'>{article.title}</h2>

            {/* Date / Heure */}
            <p>{formatDate(article.createdAt)}</p>

            {/* Liste des tags */}
            {article.tags.map((tagArticle: any) => (
              <span key={tagArticle.tag.id}>
                {tagArticle.tag.name}
              </span>
            ))}

            {/* Texte de l'article */}
            <p>{article.text}</p>
        </div>
      ))}
    </>
  )
}

export default ArticlePage