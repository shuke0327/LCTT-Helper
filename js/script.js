// 实例化编辑器
wangEditor.config.printLog = false; //禁止打印调试信息
var editor = new wangEditor('editor');
var lctteditor;

// 设置按钮
editor.config.menus = [
    'source',
    '|', // '|' 是菜单组的分割线
    'bold',
    'italic',
    'quote',
    'code',
    'head',
    'unorderlist',
    'orderlist',
    '|',
    'eraser',
    'tomarkdown',
];

editor.create();
// 生成Number Link 
function getLink(element, index, array) {
    num = index + 1;
    lctteditor.insertValue("\n[" + num + "]:" + element + "")
}

// 转换MD
function initialize() {
    linkArray = [];
    lctteditor.clear();
    titleLock = false;
}

META_INF = '\n\n' + '-'.repeat(80) + '\n\nvia: 网址\n\n作者：[ ][a]\n译者：[shuke0327](https://github.com/shuke0327)\n\n本文由 [区块链中文字幕组](https://github.com/BlockchainTranslator/EOS) 原创编译';

function generateMarkdown() {
    initialize();

    var content = toMarkdown(editor.$txt.html(), { gfm: true });
    content = content + META_INF;
    lctteditor.insertValue(content);
    //通过forEach生成LinkMap，放在文件后
    linkArray.forEach(getLink);
    lctteditor.focus();
}
// 复制内容
function copyToClipboard() {
    superClipBoard.copy(lctteditor.getValue());
}

$(document).ready(function () {
    $("#generate").on("click", generateMarkdown);
    $("#copy").on("click", copyToClipboard);

    lctteditor = editormd({
        id: "editormd",
        width: "100%",
        height: "553px",
        path: "js/lib/",
        toolbarIcons: function() {
            return ["undo", "redo", "|", "bold", "h1", "h2", "h3", "h4", "h5", "|", "link", "image", "code", "table", "|", "list-ul", "list-ol", "hr", "|", "preview", "|", "search", ]
        },
    });
});
