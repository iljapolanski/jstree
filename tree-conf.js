window.addEventListener('DOMContentLoaded', function(){
    var tree = new Tree();
    tree.elementId = 'tree';
    tree.src = 'http://localhost/tree/xml/tree-data.xml';
    tree.load();

    var tree2 = new Tree();
    tree2.elementId = 'tree-from-json';
    tree2.type = tree2.TYPE_JSON;
    tree2.src = 'http://localhost/tree/json/tree-data.json';
    tree2.load();
});
