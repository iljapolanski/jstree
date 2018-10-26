function Tree(){
    this.TYPE_XML = 1;
    this.TYPE_JSON = 2;

    this.src = '';
    this.elementId = '';
    this.type = this.TYPE_XML;

    this.CLASS_OPEN = 'switch-with-children-open far fa-arrow-alt-circle-down';
    this.CLASS_CLOSED = 'switch-with-children-closed far fa-arrow-alt-circle-right';
    this.CLASS_NOCHILDREN = 'switch-no-children far fa-circle';

    this.load = function(){
        if(!this.src || !this.elementId){
            return;
        }
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if(self.type === self.TYPE_XML){
                self.drawFromXML(xhr.responseXML);
            }else if(self.type === self.TYPE_JSON){
                var jsonNodes = eval(xhr.responseText);
                self.drawFromJSON(jsonNodes);
            }
        };
        xhr.open('GET', this.src, true);
        xhr.send();
    };
    this.drawFromJSON = function(json){
        var container = document.getElementById(this.elementId);
        container.className = 'tree';
        var ul = document.createElement('UL');
        ul = container.appendChild(ul);
        var nodes = json;
        var i=0;
        var count = nodes.length;
        var node = null;
        for(i=0; i<count; i++){
            node = nodes[i];
            this.drawSingleNodeFromJSON(node, ul);
        }
    };
    this.drawSingleNodeFromJSON = function(node, container){
        var title = node.title;
        var li = document.createElement('LI');

        var switchButton = document.createElement('SPAN');

        var titleElem = document.createElement('A');
        if(node.href){
            titleElem.href = node.href;
        }else {
            titleElem.href = 'javascript: void(0);';
        }
        titleElem.innerHTML = title;
        titleElem.className = 'title';

        switchButton = li.appendChild(switchButton);
        li.appendChild(titleElem);

        container.appendChild(li);

        var nodes = null;
        try{
            nodes = node.children;
        }catch(e){}
        if(nodes){
            var ul = document.createElement('UL');
            ul = li.appendChild(ul);

            if(node.opened === true){
                switchButton.className = this.CLASS_OPEN;
                ul.style.display = 'block';
            }else{
                switchButton.className = this.CLASS_CLOSED;
                ul.style.display = 'none';
            }
            var self = this;
            switchButton.onclick = function(){
                if(switchButton.className === self.CLASS_CLOSED){
                    switchButton.className = self.CLASS_OPEN;
                    ul.style.display = 'block';
                }else if(switchButton.className === self.CLASS_OPEN){
                    switchButton.className = self.CLASS_CLOSED;
                    ul.style.display = 'none';
                }

            };
            var i=0;
            var count = nodes.length;
            var node = null;
            for(i=0; i<count; i++){
                node = nodes[i];
                this.drawSingleNodeFromJSON(node, ul);
            }
        }else{
            switchButton.className = this.CLASS_NOCHILDREN;
        }
    };
    this.drawFromXML = function(xml){
        var container = document.getElementById(this.elementId);
        container.className = 'tree';
        var ul = document.createElement('UL');
        ul = container.appendChild(ul);
        var nodes = xml.documentElement.children;
        var i=0;
        var count = nodes.length;
        var node = null;
        for(i=0; i<count; i++){
            node = nodes[i];
            if(node.tagName !== 'node'){continue;}
            this.drawSingleNodeFromXML(node, ul);
        }
    };
    this.drawSingleNodeFromXML = function(node, container){
        var title = node.getElementsByTagName('title')[0].childNodes[0].nodeValue;
        var li = document.createElement('LI');

        var switchButton = document.createElement('SPAN');

        var titleElem = document.createElement('A');
        if(node.getElementsByTagName('href').length){
            titleElem.href = node.getElementsByTagName('href')[0].childNodes[0].nodeValue;
        }else {
            titleElem.href = 'javascript: void(0);';
        }
        titleElem.innerHTML = title;
        titleElem.className = 'title';

        switchButton = li.appendChild(switchButton);
        li.appendChild(titleElem);

        li = container.appendChild(li);

        var children = node.getElementsByTagName('children');
        if(children.length){
            var ul = document.createElement('UL');
            ul = li.appendChild(ul);

            if(node.getElementsByTagName('opened').length){
                if(node.getElementsByTagName('opened')[0].childNodes[0].nodeValue == 'true'){
                    switchButton.className = this.CLASS_OPEN;
                    ul.style.display = 'block';
                }else{
                    switchButton.className = this.CLASS_CLOSED;
                    ul.style.display = 'none';
                }
            }else{
                switchButton.className = this.CLASS_OPEN;
                ul.style.display = 'block';
            }

            var self = this;
            switchButton.onclick = function(){
                if(switchButton.className === self.CLASS_CLOSED){
                    switchButton.className = self.CLASS_OPEN;
                    ul.style.display = 'block';
                }else if(switchButton.className === self.CLASS_OPEN){
                    switchButton.className = self.CLASS_CLOSED;
                    ul.style.display = 'none';
                }

            };
            var nodes = node.getElementsByTagName('children')[0].children;
            var i=0;
            var count = nodes.length;
            var node = null;
            for(i=0; i<count; i++){
                node = nodes[i];
                if(node.tagName !== 'node'){
                    continue;
                }
                this.drawSingleNodeFromXML(node, ul);
            }
        }else{
            switchButton.className = this.CLASS_NOCHILDREN;
        }
    };
}