var Gist = function(data) {
    this.id = data.id;
    this.comments = data.comments;
    this.description = data.description;
    this.html_url = data.html_url;
}

var Renderer = function(selector) {
    this.el = document.querySelector(selector);
}
Renderer.prototype.render = function(el) {
    this.el.innerHTML = '';
    this.el.appendChild(el);
}

var ListView = function() {
    this.ul = document.createElement('ul');
}
ListView.prototype.add = function(li) {
    this.ul.appendChild(li);
}
ListView.prototype.render = function() {
    return this.ul;
}

var GistListAdapter = function(gist) {
    var list = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href', gist.html_url);
    a.setAttribute('target', '_blank');
    a.innerHTML = gist.id + '<br>' + gist.description;
    list.appendChild(a);
    return list;
}

var App = function(response) {
    console.log(response);

    var listView = new ListView();
    var renderer = new Renderer('#container');

    for (var i = 0, l = response.data.length; i < l; i++) {
        (function (data) {
            var gist = new Gist(data);
            var adapter = new GistListAdapter(gist);
            listView.add(adapter);
        })(response.data[i]);
    }

    renderer.render(listView.render());
}
