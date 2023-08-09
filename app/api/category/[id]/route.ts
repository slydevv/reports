import { NextRequest, NextResponse } from 'next/server';
const bcrypt = require('bcrypt');
import prisma from '../../../lib/prisma'

export async function GET(req: NextRequest) { 
    try {
         const id = req.url.split("category/")[1]
      
        const getOne = await prisma.category.findUnique({
            where: {
                 id:parseInt(id)
            },
            include: {
                users: true,
                reports:true,
            }
            
         })
         return NextResponse.json({getOne})
   
    } catch (error) {
        return  NextResponse.json({ error },{status:400})
    }
}


export async function PUT(req: NextRequest) { 
    try {
        const { name } = await req.json();
    const id = req.url.split("category/")[1]
     
        const update = await prisma.category.update({
        where: {
            id: parseInt(id)
        }, 
        data: {
            name,
        }
        })
    return NextResponse.json({update}, {status:200})
    } catch (error) {
       return  NextResponse.json({ error },{status:400}) 
    }
    
}
export async function DELETE(req: NextRequest) { 
    try {
        const id = req.url.split("category/")[1]
       await prisma.category.delete({
            where: { 
                id:parseInt(id)
            },
            include:{users:true}
        }) 
        return NextResponse.json("deleted category")
        
    } catch (error) {
        return  NextResponse.json({ error },{status:400}) 
    }

}