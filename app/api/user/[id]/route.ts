import { NextRequest, NextResponse } from 'next/server';
const bcrypt = require('bcrypt');
import prisma from '../../../lib/prisma'

export async function GET(req: NextRequest) { 
    try {
         const id = req.url.split("user/")[1]
      
        const getOne = await prisma.user.findUnique({
            where: {
                 id:parseInt(id)
            },
            include:{
                        categories:true
                    }
         })
         return NextResponse.json({getOne})
   
    } catch (error) {
        return  NextResponse.json({ error },{status:400})
    }
}


export async function PUT(req: NextRequest) { 
    try {
        const { name, email, password, category } = await req.json();
    const id = req.url.split("user/")[1]
     const hashed = await bcrypt.hash(password, 12);
        const update = await prisma.user.update({
        where: {
            id: parseInt(id)
        }, 
        data: {
            name,
            email,
            password: hashed,
            categories: {connect: category.map((singleCategory:any) => ({ name: singleCategory }))}
            
        }
        })
    return NextResponse.json({update}, {status:200})
    } catch (error) {
       return  NextResponse.json({ error },{status:400}) 
    }
    
}
export async function DELETE(req: NextRequest) { 
    try {
        const id = req.url.split("user/")[1]
        const deleted = await prisma.user.delete({
            where: { 
                id:parseInt(id)
            }, include: { categories: true },
        }) 
        return NextResponse.json(deleted)
        
    } catch (error) {
        return  NextResponse.json({ error },{status:400}) 
    }

}