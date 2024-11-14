import React from 'react';
import { formatDate } from '@/lib/utils'; // On importe la fonction formatDate du dossier lib/utils.ts
import Button from './Button';
import Tag from './Tag';
import Link from 'next/link';

interface ArticleCardProps {
  article: ArticleWithTagsAndComments;
}

const ArticleCard:React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className='group border border-slate-500 p-6 rounded-md hover:bg-slate-700 cursor-pointer hover:-translate-y-2 duration-300' key={article.id}> {/* On utilise la propriété id de l'article comme clé */}
        {/* Titre de l'article */}
        <h2 className='text-2xl md:text-xl font-bold'>{article.title}</h2>

        {/* Date / Heure */}
        <p className='text-sm text-slate-300'>{formatDate(article.createdAt)}</p> {/* On formate la date avec la fonction formatDate du dossier lib/utils.ts */}

        {/* Liste des tags */}
        <div className='flex flex-wrap gap-2 my-4'>
        {article.tags.map((tagArticle) => ( // On boucle sur les tags de l'article avec la méthode map
            // <span className='duration-300 group-hover:bg-pink-600 px-3 py-2 text-xs rounded-full bg-slate-600' key={tagArticle.tag.id}> {/* On utilise la propriété id du tag comme clé */}
            // {tagArticle.tag.name}
            // </span>
            <Tag key={tagArticle.tag.id} text={tagArticle.tag.name} />
        ))}
        </div>

        {/* Texte de l'article */}
        <p className='line-clamp-4'>{article.text}</p>
        {/* <Link label='Voir plus...' /> */}
    </div>
  )
}

export default ArticleCard
