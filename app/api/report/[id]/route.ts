import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'

export async function GET(req: NextRequest) { 
    try {
         const id = req.url.split("report/")[1]
      
        const getOne = await prisma.report.findUnique({
            where: {
                 id:parseInt(id)
            },
            
         })
         return NextResponse.json({getOne})
   
    } catch (error) {
        return  NextResponse.json({ error },{status:400})
    }
}

export async function PUT(req: NextRequest) { 
    try {
        const { url, label } = await req.json();
    const id = req.url.split("report/")[1]
     
        const update = await prisma.report.update({
        where: {
            id: parseInt(id)
        }, 
        data: {
            label,
            url,
        }
        })
    return NextResponse.json({update}, {status:200})
    } catch (error) {
       return  NextResponse.json({ error },{status:400}) 
    }   
}

export async function DELETE(req: NextRequest) { 
    try {
        const id = req.url.split("report/")[1]
        const deleted = await prisma.report.delete({
            where: { 
                id:parseInt(id)
            },
        }) 
        return NextResponse.json(deleted)
        
    } catch (error) {
        return  NextResponse.json({ error },{status:400}) 
    }

}