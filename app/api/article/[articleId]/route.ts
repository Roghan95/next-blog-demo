import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { articleId: string } }) {
    
    const { articleId } = params;
    // const articleId = params.articleId;

    try {
        // Récupérer un article par son ID
        const article = await db.article.findUnique({
            where: {
                id: articleId
            },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                },
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })
       // Retourne une réponse format JSON
       return NextResponse.json(article)
   
   } catch (error) {
       console.log("[ARTICLE]", error)
       return new NextResponse("Internal Error", {status: 500})
   }
}