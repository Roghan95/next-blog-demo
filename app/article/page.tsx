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
      <h1 className='text-2xl font-bold uppercase mb-5'>Blog</h1>
      {/* Liste des articles */}
      {articles.map((article: any) => ( // On boucle sur les articles avec la méthode map
        <div className='mb-6' key={article.id}> {/* On utilise la propriété id de l'article comme clé */}

            {/* Titre de l'article */}
            <h2 className='text-2xl font-semibold text-emerald-700'>{article.title}</h2>

            {/* Date / Heure */}
            <p>{formatDate(article.createdAt)}</p> {/* On formate la date avec la fonction formatDate du dossier lib/utils.ts */}

            {/* Liste des tags */}
            {article.tags.map((tagArticle: any) => ( // On boucle sur les tags de l'article avec la méthode map
              <span key={tagArticle.tag.id}> {/* On utilise la propriété id du tag comme clé */}
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