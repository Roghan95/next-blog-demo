'use client';

import { formatDate } from '@/lib/utils'; // On importe la fonction formatDate du dossier lib/utils.ts
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

  const [articles, setArticles] = useState([]); // Initialisation du state
  useEffect(() => { // Hook d'effet pour appeler l'API
    const fetchArticles = async () => { // Fonction asynchrone
      const response = await fetch('/api/article'); // On appelle l'API en utilisant la route /api/article avec fetch
      const data = await response.json(); // On récupère les données de la réponse en JSON
      setArticles(data); // On met à jour le state avec les données récupérées
    }

    fetchArticles(); // On appelle la fonction fetchArticles pour récupérer les données
  }, []) // Tableau de dépendances vide pour appeler fetchArticles une seule fois

  return (
    <>
      <h1 className='text-4xl font-bold mb-6'>Blog</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {/* Liste des articles */}
        {articles.map((article: any) => ( // On boucle sur les articles avec la méthode map
          <div className='group border border-slate-500 p-6 rounded-md hover:bg-slate-700 cursor-pointer hover:-translate-y-2 duration-300' key={article.id}> {/* On utilise la propriété id de l'article comme clé */}

              {/* Titre de l'article */}
              <h2 className='text-2xl md:text-xl font-bold'>{article.title}</h2>

              {/* Date / Heure */}
              <p className='text-sm text-slate-300'>{formatDate(article.createdAt)}</p> {/* On formate la date avec la fonction formatDate du dossier lib/utils.ts */}

              {/* Liste des tags */}
              <div className='flex flex-wrap gap-2 my-4'>
                {article.tags.map((tagArticle: any) => ( // On boucle sur les tags de l'article avec la méthode map
                  <span className='duration-300 group-hover:bg-pink-600 px-3 py-2 text-xs rounded-full bg-slate-600' key={tagArticle.tag.id}> {/* On utilise la propriété id du tag comme clé */}
                    {tagArticle.tag.name}
                  </span>
                ))}
              </div>

              {/* Texte de l'article */}
              <p className='line-clamp-4'>{article.text}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ArticlePage