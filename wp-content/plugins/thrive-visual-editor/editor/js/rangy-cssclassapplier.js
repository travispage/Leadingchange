/**
 * Class Applier module for Rangy.
 * Adds, removes and toggles classes on Ranges and Selections
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.20140716
 * Build date: 16 July 2014
 */
rangy.createModule("ClassApplier",["WrappedSelection"],function(e,t){function n(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(n,e[n])===!1)return!1;return!0}function s(e){return e.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function r(e,t){return e.className&&new RegExp("(?:^|\\s)"+t+"(?:\\s|$)").test(e.className)}function i(e,t){e.className?r(e,t)||(e.className+=" "+t):e.className=t}function o(e){return e&&e.split(/\s+/).sort().join(" ")}function a(e){return o(e.className)}function l(e,t){return a(e)==a(t)}function f(e,t,n,s,r){var i=e.node,o=e.offset,a=i,l=o;i==s&&o>r&&++l,i!=t||o!=n&&o!=n+1||(a=s,l+=r-n),i==t&&o>n+1&&--l,e.node=a,e.offset=l}function d(e,t,n){e.node==t&&e.offset>n&&--e.offset}function u(e,t,n,s){-1==n&&(n=t.childNodes.length);for(var r,i=e.parentNode,o=M.getNodeIndex(e),a=0;r=s[a++];)f(r,i,o,t,n);t.childNodes.length==n?t.appendChild(e):t.insertBefore(e,t.childNodes[n])}function p(e,t){for(var n,s=e.parentNode,r=M.getNodeIndex(e),i=0;n=t[i++];)d(n,s,r);e.parentNode.removeChild(e)}function c(e,t,n,s,r){for(var i,o=[];i=e.firstChild;)u(i,t,n++,r),o.push(i);return s&&p(e,r),o}function h(e,t){return c(e,e.parentNode,M.getNodeIndex(e),!0,t)}function g(e,t){var n=e.cloneRange();n.selectNodeContents(t);var s=n.intersection(e),r=s?s.toString():"";return""!=r}function m(e){for(var t,n=e.getNodes([3]),s=0;(t=n[s])&&!g(e,t);)++s;for(var r=n.length-1;(t=n[r])&&!g(e,t);)--r;return n.slice(s,r+1)}function N(e,t){if(e.attributes.length!=t.attributes.length)return!1;for(var n,s,r,i=0,o=e.attributes.length;o>i;++i)if(n=e.attributes[i],r=n.name,"class"!=r){if(s=t.attributes.getNamedItem(r),null===n!=(null===s))return!1;if(n.specified!=s.specified)return!1;if(n.specified&&n.nodeValue!==s.nodeValue)return!1}return!0}function v(e,t){for(var n,s=0,r=e.attributes.length;r>s;++s)if(n=e.attributes[s].name,(!t||!j(t,n))&&e.attributes[s].specified&&"class"!=n)return!0;return!1}function C(e,t){return n(t,function(t,n){if("object"==typeof n){if(!C(e[t],n))return!1}else if(e[t]!==n)return!1})}function y(e){var t;return e&&1==e.nodeType&&((t=e.parentNode)&&9==t.nodeType&&"on"==t.designMode||$(e)&&!$(e.parentNode))}function T(e){return($(e)||1!=e.nodeType&&$(e.parentNode))&&!y(e)}function E(e){return e&&1==e.nodeType&&!U.test(H(e,"display"))}function b(e){if(0==e.data.length)return!0;if(V.test(e.data))return!1;var t=H(e.parentNode,"whiteSpace");switch(t){case"pre":case"pre-wrap":case"-moz-pre-wrap":return!1;case"pre-line":if(/[\r\n]/.test(e.data))return!1}return E(e.previousSibling)||E(e.nextSibling)}function A(e){var t,n,s=[];for(t=0;n=e[t++];)s.push(new L(n.startContainer,n.startOffset),new L(n.endContainer,n.endOffset));return s}function S(e,t){for(var n,s,r,i=0,o=e.length;o>i;++i)n=e[i],s=t[2*i],r=t[2*i+1],n.setStartAndEnd(s.node,s.offset,r.node,r.offset)}function x(e,t){return M.isCharacterDataNode(e)?0==t?!!e.previousSibling:t==e.length?!!e.nextSibling:!0:t>0&&t<e.childNodes.length}function R(e,n,s,r){var i,o,a=0==s;if(M.isAncestorOf(n,e))return e;if(M.isCharacterDataNode(n)){var l=M.getNodeIndex(n);if(0==s)s=l;else{if(s!=n.length)throw t.createError("splitNodeAt() should not be called with offset in the middle of a data node ("+s+" in "+n.data);s=l+1}n=n.parentNode}if(x(n,s)){i=n.cloneNode(!1),o=n.parentNode,i.id&&i.removeAttribute("id");for(var f,d=0;f=n.childNodes[s];)u(f,i,d++,r);return u(i,o,M.getNodeIndex(n)+1,r),n==e?i:R(e,o,M.getNodeIndex(i),r)}if(e!=n){i=n.parentNode;var p=M.getNodeIndex(n);return a||p++,R(e,i,p,r)}return e}function w(e,t){return e.namespaceURI==t.namespaceURI&&e.tagName.toLowerCase()==t.tagName.toLowerCase()&&l(e,t)&&N(e,t)&&"inline"==H(e,"display")&&"inline"==H(t,"display")}function P(e){var t=e?"nextSibling":"previousSibling";return function(n,s){var r=n.parentNode,i=n[t];if(i){if(i&&3==i.nodeType)return i}else if(s&&(i=r[t],i&&1==i.nodeType&&w(r,i))){var o=i[e?"firstChild":"lastChild"];if(o&&3==o.nodeType)return o}return null}}function O(e){this.isElementMerge=1==e.nodeType,this.textNodes=[];var t=this.isElementMerge?e.lastChild:e;t&&(this.textNodes[0]=t)}function I(e,t,r){var i,o,a,l,f=this;f.cssClass=e;var d=null,u={};if("object"==typeof t&&null!==t){for(r=t.tagNames,d=t.elementProperties,u=t.elementAttributes,o=0;l=F[o++];)t.hasOwnProperty(l)&&(f[l]=t[l]);i=t.normalize}else i=t;f.normalize="undefined"==typeof i?!0:i,f.attrExceptions=[];var p=document.createElement(f.elementTagName);f.elementProperties=f.copyPropertiesToElement(d,p,!0),n(u,function(e){f.attrExceptions.push(e)}),f.elementAttributes=u,f.elementSortedClassName=f.elementProperties.hasOwnProperty("className")?f.elementProperties.className:e,f.applyToAnyTagName=!1;var c=typeof r;if("string"==c)"*"==r?f.applyToAnyTagName=!0:f.tagNames=s(r.toLowerCase()).split(/\s*,\s*/);else if("object"==c&&"number"==typeof r.length)for(f.tagNames=[],o=0,a=r.length;a>o;++o)"*"==r[o]?f.applyToAnyTagName=!0:f.tagNames.push(r[o].toLowerCase());else f.tagNames=[f.elementTagName]}function W(e,t,n){return new I(e,t,n)}var M=e.dom,L=M.DomPosition,j=M.arrayContains,z=M.isHtmlNamespace,B="span",D=function(){function e(e,t,n){return t&&n?" ":""}return function(t,n){t.className&&(t.className=t.className.replace(new RegExp("(^|\\s)"+n+"(\\s|$)"),e))}}(),H=M.getComputedStyleProperty,$=function(){var e=document.createElement("div");return"boolean"==typeof e.isContentEditable?function(e){return e&&1==e.nodeType&&e.isContentEditable}:function(e){return e&&1==e.nodeType&&"false"!=e.contentEditable?"true"==e.contentEditable||$(e.parentNode):!1}}(),U=/^inline(-block|-table)?$/i,V=/[^\r\n\t\f \u200B]/,k=P(!1),q=P(!0);O.prototype={doMerge:function(e){var t=this.textNodes,n=t[0];if(t.length>1){for(var s,r,i,o,a=M.getNodeIndex(n),l=[],f=0,d=0,u=t.length;u>d;++d){if(s=t[d],r=s.parentNode,d>0&&(r.removeChild(s),r.hasChildNodes()||r.parentNode.removeChild(r),e))for(i=0;o=e[i++];)o.node==s&&(o.node=n,o.offset+=f),o.node==r&&o.offset>a&&(--o.offset,o.offset==a+1&&u-1>d&&(o.node=n,o.offset=f));l[d]=s.data,f+=s.data.length}n.data=l.join("")}return n.data},getLength:function(){for(var e=this.textNodes.length,t=0;e--;)t+=this.textNodes[e].length;return t},toString:function(){for(var e=[],t=0,n=this.textNodes.length;n>t;++t)e[t]="'"+this.textNodes[t].data+"'";return"[Merge("+e.join(",")+")]"}};var F=["elementTagName","ignoreWhiteSpace","applyToEditableOnly","useExistingElements","removeEmptyElements","onElementCreate"],G={};I.prototype={elementTagName:B,elementProperties:{},elementAttributes:{},ignoreWhiteSpace:!0,applyToEditableOnly:!1,useExistingElements:!0,removeEmptyElements:!0,onElementCreate:null,copyPropertiesToElement:function(e,t,n){var s,r,a,l,f,d,u={};for(var p in e)if(e.hasOwnProperty(p))if(l=e[p],f=t[p],"className"==p)i(t,l),i(t,this.cssClass),t[p]=o(t[p]),n&&(u[p]=t[p]);else if("style"==p){r=f,n&&(u[p]=a={});for(s in e[p])r[s]=l[s],n&&(a[s]=r[s]);this.attrExceptions.push(p)}else t[p]=l,n&&(u[p]=t[p],d=G.hasOwnProperty(p)?G[p]:p,this.attrExceptions.push(d));return n?u:""},copyAttributesToElement:function(e,t){for(var n in e)e.hasOwnProperty(n)&&t.setAttribute(n,e[n])},hasClass:function(e){return 1==e.nodeType&&j(this.tagNames,e.tagName.toLowerCase())&&r(e,this.cssClass)},getSelfOrAncestorWithClass:function(e){for(;e;){if(this.hasClass(e))return e;e=e.parentNode}return null},isModifiable:function(e){return!this.applyToEditableOnly||T(e)},isIgnorableWhiteSpaceNode:function(e){return this.ignoreWhiteSpace&&e&&3==e.nodeType&&b(e)},postApply:function(e,t,n,s){for(var r,i,o,a=e[0],l=e[e.length-1],f=[],d=a,u=l,p=0,c=l.length,h=0,g=e.length;g>h;++h)i=e[h],o=k(i,!s),o?(r||(r=new O(o),f.push(r)),r.textNodes.push(i),i===a&&(d=r.textNodes[0],p=d.length),i===l&&(u=r.textNodes[0],c=r.getLength())):r=null;var m=q(l,!s);if(m&&(r||(r=new O(l),f.push(r)),r.textNodes.push(m)),f.length){for(h=0,g=f.length;g>h;++h)f[h].doMerge(n);t.setStartAndEnd(d,p,u,c)}},createContainer:function(e){var t=e.createElement(this.elementTagName);return this.copyPropertiesToElement(this.elementProperties,t,!1),this.copyAttributesToElement(this.elementAttributes,t),i(t,this.cssClass),this.onElementCreate&&this.onElementCreate(t,this),t},applyToTextNode:function(e){var t=e.parentNode;if(1==t.childNodes.length&&this.useExistingElements&&z(t)&&j(this.tagNames,t.tagName.toLowerCase())&&C(t,this.elementProperties))i(t,this.cssClass);else{var n=this.createContainer(M.getDocument(e));e.parentNode.insertBefore(n,e),n.appendChild(e)}},isRemovable:function(e){return z(e)&&e.tagName.toLowerCase()==this.elementTagName&&a(e)==this.elementSortedClassName&&C(e,this.elementProperties)&&!v(e,this.attrExceptions)&&this.isModifiable(e)},isEmptyContainer:function(e){var t=e.childNodes.length;return 1==e.nodeType&&this.isRemovable(e)&&(0==t||1==t&&this.isEmptyContainer(e.firstChild))},removeEmptyContainers:function(e){for(var t,n=this,s=e.getNodes([1],function(e){return n.isEmptyContainer(e)}),r=[e],i=A(r),o=0;t=s[o++];)p(t,i);S(r,i)},undoToTextNode:function(e,t,n,s){if(!t.containsNode(n)){var r=t.cloneRange();r.selectNode(n),r.isPointInRange(t.endContainer,t.endOffset)&&(R(n,t.endContainer,t.endOffset,s),t.setEndAfter(n)),r.isPointInRange(t.startContainer,t.startOffset)&&(n=R(n,t.startContainer,t.startOffset,s))}this.isRemovable(n)?h(n,s):D(n,this.cssClass)},applyToRange:function(e,t){t=t||[];var n=A(t||[]);e.splitBoundariesPreservingPositions(n),this.removeEmptyElements&&this.removeEmptyContainers(e);var s=m(e);if(s.length){for(var r,i=0;r=s[i++];)this.isIgnorableWhiteSpaceNode(r)||this.getSelfOrAncestorWithClass(r)||!this.isModifiable(r)||this.applyToTextNode(r,n);r=s[s.length-1],e.setStartAndEnd(s[0],0,r,r.length),this.normalize&&this.postApply(s,e,n,!1),S(t,n)}},applyToRanges:function(e){for(var t=e.length;t--;)this.applyToRange(e[t],e);return e},applyToSelection:function(t){var n=e.getSelection(t);n.setRanges(this.applyToRanges(n.getAllRanges()))},undoToRange:function(e,t){t=t||[];var n=A(t);e.splitBoundariesPreservingPositions(n),this.removeEmptyElements&&this.removeEmptyContainers(e,n);var s,r,i=m(e),o=i[i.length-1];if(i.length){for(var a=0,l=i.length;l>a;++a)s=i[a],r=this.getSelfOrAncestorWithClass(s),r&&this.isModifiable(s)&&this.undoToTextNode(s,e,r,n),e.setStartAndEnd(i[0],0,o,o.length);this.normalize&&this.postApply(i,e,n,!0),S(t,n)}},undoToRanges:function(e){for(var t=e.length;t--;)this.undoToRange(e[t],e);return e},undoToSelection:function(t){var n=e.getSelection(t),s=e.getSelection(t).getAllRanges();this.undoToRanges(s),n.setRanges(s)},isAppliedToRange:function(e){if(e.collapsed||""==e.toString())return!!this.getSelfOrAncestorWithClass(e.commonAncestorContainer);var t=e.getNodes([3]);if(t.length)for(var n,s=0;n=t[s++];)if(!this.isIgnorableWhiteSpaceNode(n)&&g(e,n)&&this.isModifiable(n)&&!this.getSelfOrAncestorWithClass(n))return!1;return!0},isAppliedToRanges:function(e){var t=e.length;if(0==t)return!1;for(;t--;)if(!this.isAppliedToRange(e[t]))return!1;return!0},isAppliedToSelection:function(t){var n=e.getSelection(t);return this.isAppliedToRanges(n.getAllRanges())},toggleRange:function(e){this.isAppliedToRange(e)?this.undoToRange(e):this.applyToRange(e)},toggleSelection:function(e){this.isAppliedToSelection(e)?this.undoToSelection(e):this.applyToSelection(e)},getElementsWithClassIntersectingRange:function(e){var t=[],n=this;return e.getNodes([3],function(e){var s=n.getSelfOrAncestorWithClass(e);s&&!j(t,s)&&t.push(s)}),t},detach:function(){}},I.util={hasClass:r,addClass:i,removeClass:D,hasSameClasses:l,replaceWithOwnChildren:h,elementsHaveSameNonClassAttributes:N,elementHasNonClassAttributes:v,splitNodeAt:R,isEditableElement:$,isEditingHost:y,isEditable:T},e.CssClassApplier=e.ClassApplier=I,e.createCssClassApplier=e.createClassApplier=W});