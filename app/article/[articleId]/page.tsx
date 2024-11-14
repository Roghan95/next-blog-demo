"use client"

import Tag from '@/components/Tag'
import React, { useEffect, useState } from 'react'

const ArticleDetailPage = ({ params }: {params: { articleId: string }}) => {
  
    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)

    // useEffect permet de consommer l'API (article)
    useEffect(() => {
        const fetchArticle = async () => {
            // Récupérer les data de l'article via l'API
            const response = await fetch(`/api/article/${params.articleId}`)
            // Récupère les données au format JSON
            const data: ArticleWithTagsAndComments = await response.json()
            // Mets dans article le contenu de data récupérer dans l'API
            setArticle(data)
        }
        // Déclencher la fonction fetchArticle
        fetchArticle()

    }, [params.articleId])

    return (
        <div>
            <h1 className='text-2xl font-bold mb-5'>{article?.title}</h1>
            <div className='my-5 flex flex-wrap gap-3'>
                {article?.tags.map((tagArticle: TagArticleType) => (
                    <Tag key={tagArticle.id} text={tagArticle.tag.name} />
                ))}
            </div>
            <p>{article?.text}</p>
        </div>
    )
}

export default ArticleDetailPage
