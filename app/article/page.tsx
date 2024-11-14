'use client';

import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
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

  // VERSION 2 : Avec Hooks

  const [articles, setArticles] = useState<ArticleWithTagsAndComments[]>([]); // Initialisation du state
  useEffect(() => { // Hook d'effet pour appeler l'API
    const fetchArticles = async () => { // Fonction asynchrone
      const response = await fetch('/api/article'); // On appelle l'API en utilisant la route /api/article avec fetch
      const data: ArticleWithTagsAndComments[] = await response.json(); // On récupère les données de la réponse en JSON
      setArticles(data); // On met à jour le state avec les données récupérées
    }

    fetchArticles(); // On appelle la fonction fetchArticles pour récupérer les données
  }, []) // Tableau de dépendances vide pour appeler fetchArticles une seule fois

  return (
    <>
      <h1  className='text-4xl font-bold mb-6'>Blog</h1>

      <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {/* Liste des articles */}
        {articles.map((article) => (// On boucle sur les articles avec la méthode map
          <Link key={article.id} href={`/article/${article.id}`}>
            <ArticleCard key={article.id} article={article} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default ArticlePage