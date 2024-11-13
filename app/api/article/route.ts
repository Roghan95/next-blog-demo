import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
         // Récupérer la liste des articles
        const articles = await db.article.findMany({
            orderBy: {
            createdAt: 'asc' // Tri par date de création croissante
            },
            include: { // Inclure les tags 
            tags: { 
                include: {
                tag : true // Inclure le tag associé à l'article set sur true
                }
            },
            }
        });

        // Retourne une réponse format JSON
        return NextResponse.json(articles)
    
    // Catch les erreurs et retourne une réponse avec un status 500 
    } catch (error) {
        console.log("[ARTICLES]", error) // Affiche l'erreur dans le terminal
        return new NextResponse("Internal Error", {status: 500})
    }
}