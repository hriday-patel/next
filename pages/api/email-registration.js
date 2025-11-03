import path from 'path';
import fs from 'fs';

export function buildPath(){
    return path.join('data', 'events.json');
}

export function readFile(filePath) {
    const formdata = fs.readFileSync(filePath);
    const data = JSON.parse(formdata);
    return data;
}



export default async function handleRequest(req, res){
    const {method} = req;
    const data = buildPath();
    const {events_categories, allEvents} = readFile(data);
    if(!allEvents){
        return new Response(JSON.parse({message: 'No events found!'}), {
            status: 404,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
    if(method === 'POST'){
        const {dataId, value} = req.body;
        const newEvent = allEvents.map((ev) => {
            if(ev.id == dataId){
                if(ev.emails_registered.includes(value)){
                    res.status(409).json({
                        message: `Your email: ${value} already exists!`
                    })
                    return ev;
                }
                else{
                    return {
                        ...ev, emails_registered: [...ev.emails_registered , value]
                    }
                }
            }
            return ev;
        })
        fs.writeFileSync(data,JSON.stringify({events_categories, allEvents: newEvent}) );
        res.status(200).json({
            message: `You have  been successulyy registered with the email: ${value}`
        })
    }
}