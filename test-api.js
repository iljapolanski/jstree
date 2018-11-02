function testAPI(){

    var node = {'title': 'edited node',
    'href': 'javascript: void(0);',
    'parentId': 2,
    'position': 1,
    'opened': 0};

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        //var entities = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
    };
    xhr.open('GET', 'http://increase.loc/api/hierarchy?expand=children', true);
    xhr.setRequestHeader('Authorization', 'Bearer AccessToken_For_Admin');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(null);
}
