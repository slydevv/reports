import prisma from '../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request, res: NextResponse) {
  
            try {
                const category = await prisma.category.findMany({
                    include:{
                        users:true
                    }
                })
                
               return NextResponse.json(category)
            } catch (error) {
                NextResponse.json(error)
            }
 
    } 


export async function POST(req: NextRequest, res:NextResponse) {
    const body =  await req.json()
    const { name } = body
      try {
                 if (!name ) {
                    return  NextResponse.json({error:"Please fill in all the fields"}, { status: 400 })
                     }
               
                const categoryExist = await prisma.category.findFirst({
                    where: {
                        name:name
                    }
                })
                if (categoryExist) { 
                    return NextResponse.json({error:"This category already exist"}, {status:400})
                }
                const result = await prisma.category.create({
                    data: {
                        name,
                    }
                })
          return NextResponse.json({ result })
            } catch (error) {
          return  NextResponse.json({ error }, {status:400})
            }
}
