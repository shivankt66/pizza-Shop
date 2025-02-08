// network call code
import url from "../utils/constant.js";

async function makeNetworkCall(){

    try{
    const response = await fetch(url);
    const object = await response.json();
    return object;//wrap promise
    }
    catch(err){
        console.log('Some Problem in API Call',err);
        throw err;
    }

}    
export default makeNetworkCall;


//     const promise = fetch(url); // assign to thread
//     console.log('promise is',promise);
//     promise.then(response=>{
//         console.log('response is',response);
//         const promise2=response.json(); //deserialization
//         promise2.then(data=>{
//             console.log('data is ',data);
//         }).catch(e=>{
//             console.log('JSON prs error',e);
//         })
//     }).catch(err=>{
//         console.log('Error is',err);
//     });
