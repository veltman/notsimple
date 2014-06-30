// Taken from http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945

function process(node) {

  switch (node.nodeType) {

    // 3 = text node
    case 3:

      addQuotes(node);
      break;

    // 1 = element, 9 = document, 11 = fragment
    case 1:
    case 9:
    case 11:

      var child = node.firstChild,
          next;

      while (child) {
        process(child);
        child = child.nextSibling;
      }

  }

}

function addQuotes(n) {

  var tx = n.nodeValue;

  if (tx.match(/\b(simpl(e|y)|eas(il)?y)\b/i)) {

    tx = tx.replace(/\beas(il)?y\b[.,]?/gi, "\"$&\"")
           .replace(/\bsimpl(e|y)\b[.,]?/gi, "\"$&\"")
           .replace(/n(o|')t\s*["](eas(il)?y|simpl(e|y))[.,]?["]/gi,function(m){
             return m.replace(/"/g,"");
           });

    n.nodeValue = tx;

  }

}

process(document.body);

