export default function Fetchdata(url) {
    return fetch(url).then((res)=>res.json().then((data)=>{
        return data;
    }))
    .catch((err)=> {
        console.log(`Fetching the api failed with error, ${err}`)
    })
}