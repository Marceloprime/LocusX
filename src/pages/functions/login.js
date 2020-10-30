export default  async function login(inscricao, senha){
    let request = new XMLHttpRequest();
    
    await request.open('POST', 'http://class-path-auth.herokuapp.com/login/');

    await request.setRequestHeader('Content-Type', 'application/json');

    var body = {
        'username': inscricao,
        'password': senha,
    };

    request.send(JSON.stringify(body));
     const response = await request.responseText

    console.log("Final: " + response)
    return response
}