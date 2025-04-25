export function Get(request){
    return new Response("Hello World")
}

export async function POST(request){
    const body = await request.text()
    return new Response(body)
}

