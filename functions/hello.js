//the data will not connect with stripe diretly, it is too danger, we are going to communicate with stripe using function 

exports.handler = async function(event,context){
    return {
        statusCode:200,
        body:'Hello_World'
    }
}
