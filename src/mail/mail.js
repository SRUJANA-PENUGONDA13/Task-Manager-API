const { compare } = require('bcryptjs')
const request = require('request')

const welcomeMail = (name,mail)=>
{
    text = "Thank you for sign up to TaskKeeper App. Let's explore the features and enjoy it. Feel free to touch with me."
    message = { "senderName" : "Srujana Penugonda", "receiverName" : name ,"mail" : 'srujanapenugonda1318@outlook.com' , "message" : text}
    url = 'https://srujana-mail-service.herokuapp.com/'+'mail'+'/'+mail+'/'+'TaskKeeper App'+'/'+JSON.stringify(message)
    request(url, (error,response)=>
    {
        console.log("Success") 
    })
}

module.exports = {welcomeMail}