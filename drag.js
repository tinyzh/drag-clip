/**
 * Created by zhangchao on 17/3/6.
 */

var cArea = $('#ele');  // 最外层容器
var drag = $('.drag');  // 拖拽区域
var cAreaH = cArea.height(); //容器高度
var cAreaW = cArea.width();  // 容器宽度
var cAreaTop = getPosition(cArea).Y; // 容器距离浏览器上边界距离
var cAreaLeft = getPosition(cArea).X; // 容器距离浏览器左边界距离
var currentEle = null; // 缓存当前拖动的元素
var mousePosition, mouseStartX, mouseStartY, dragLeft, dragTop, dragMaxH, dragMaxW;  // 定义按下鼠标产生的变量

$('body').on('mousedown','.drag',startDrag);

function startDrag(e){
    currentEle = this;
    e.preventDefault();
    mouseStartX = e.clientX; // 按下鼠标时，相对于浏览器边界的x坐标
    mouseStartY = e.clientY;  // 按下鼠标时，相对于浏览器边界的Y坐标
    dragLeft = $(this).offset().left; // 按下鼠标时，拉伸框距离容器顶部的距离
    dragTop = $(this).offset().top;  // 按下鼠标时，拉伸框距离容器顶部的距离

    dragMaxH = cAreaH - drag.height();  //垂直移动最大范围
    dragMaxW = cAreaW - drag.width();  // 水平移动最大范围
    mousePosition = $(e.target).attr('data-type');  // 判断按下的位置 是中间还是边上的拉伸点
    $(document).on('mousemove',dragging).on('mouseup',clearDragEvent);
}

/**
 * 监听鼠标移动
 * @param e
 */
function dragging(e){
    e.stopPropagation();
    window.getSelection().removeAllRanges();
    switch(mousePosition){
        case 'drag' : dragMove(e); break;
        case 'cUp' : upDownMove(e,'up'); break;
        case 'cDown' : upDownMove(e,'down'); break;
        case 'cLeft' : leftRightMove(e,'left'); break;
        case 'cRight' : leftRightMove(e,'right'); break;
        case 'cLeftUp' : leftRightMove(e,'left'); upDownMove(e,'up'); break;
        case 'cLeftDown' : leftRightMove(e,'left'); upDownMove(e,'down'); break;
        case 'cRightUp' : leftRightMove(e,'right'); upDownMove(e,'up'); break;
        case 'cRightDown' : leftRightMove(e,'right'); upDownMove(e,'down'); break;
        default : break;
    }
}

/**
 * 拉伸框整体移动
 * @param e
 */
function dragMove(e){
    var moveX = e.clientX - mouseStartX; // 拖拽中  当前坐标 - 初始坐标
    var moveY = e.clientY - mouseStartY;

    var destinationX = Math.min((moveX + dragLeft),dragMaxW); //限制拖动最大范围
    var destinationY = Math.min((moveY + dragTop),dragMaxH);
    $(currentEle).css({
        left : destinationX < 0 ? 0 : destinationX,
        top : destinationY < 0 ? 0 : destinationY
    });

}

/**
 * 鼠标松开 释放事件
 * @param e
 */
function clearDragEvent(e){
    $(document).off('mousemove',dragging).off('mouseup',clearDragEvent);
}

/**
 * 上下方向的边框拖动
 * @param e event事件
 * @param direction  方向
 */
function upDownMove(e,direction){
    var draggingY = e.clientY;
    if(draggingY < cAreaTop) draggingY = cAreaTop;  // 限制最多只能移动到容器的上下边界
    if(draggingY > cAreaTop + cAreaH) draggingY = cAreaTop + cAreaH;
    var dragY = getPosition(currentEle).Y;
    if(direction === 'up'){
        var changeHeight = dragY - draggingY;
        $(currentEle).css('top' , draggingY);
    }else if(direction === 'down'){
        var changeHeight = draggingY - parseFloat($(currentEle).css('height')) - dragY;
    }
    var endHeight = changeHeight + parseFloat($(currentEle).css('height'));
    $(currentEle).css('height',endHeight);
};

/**
 * 水平方向的边框拖动
 * @param e event
 * @param direction 方向
 */
function leftRightMove(e,direction){
    var draggingX = e.clientX;
    if(draggingX < cAreaLeft) draggingX = cAreaLeft;
    if(draggingX > cAreaLeft + cAreaW) draggingX = cAreaLeft + cAreaW;
    var dragX = getPosition(currentEle).X;

    if(direction === 'left'){
        var changeWidth = dragX - draggingX;
        $(currentEle).css('left', draggingX);
    }else if(direction === 'right'){
        var changeWidth = draggingX - parseFloat($(currentEle).css('width')) - dragX;
    }
    var endWidth = changeWidth + parseFloat($(currentEle).css('width'));
    $(currentEle).css('width',endWidth);
};


/**
 * 获取元素距离父容器的距离
 * @param elem  容器
 */
function getPosition(elem){
    var elemX = $(elem).position().left; // 相对于element.offsetParent节点的左边界偏移像素值
    var elemY = $(elem).position().top;  // 相对于element.offsetParent节点的上边界偏移像素值

    return {X : elemX, Y : elemY};
};


///////////////////////////////////////////////////////////////
// 图片拖拽功能
var $container = $('#ele');   //移入的容器
var $dragItem = $('.drag-item'); // 可以拖动的元素
var eleDrag = null; //当前被拖动的元素
var endPosition = {left : '', top : ''};  // 放开元素时的鼠标坐标
$dragItem.on('selectstart',function(){
    return false;
});

$dragItem.on('dragstart',function(ev){
    // 拖拽开始
    ev.originalEvent.dataTransfer.effectAllowed = 'move';
    eleDrag = ev.target;
    return true;
}).on('dragend',function(ev){
    eleDrag = null;
    return false;
});

$container.on('dragover',function(ev){
    ev.preventDefault();
    return true;
}).on('dragenter',function(ev){
    $(this).toggleClass('active');
    return true;
}).on('drop',function(ev){
    endPosition.left = ev.originalEvent.x;
    endPosition.top = ev.originalEvent.y;
    if(eleDrag){
        setHtml(eleDrag)
    }
    $(this).toggleClass('active');
});

function setHtml(eleDrag){
    var src = $(eleDrag).attr('src');
    var $img = $('<img>');
    var $dragEle = $('<div>');
    var directionBtn = $('.cacheEle').html();
    $img.attr('src',$(eleDrag).attr('src')).attr('data-type','drag');
    $dragEle.addClass('drag').attr('data-type','drag').html($img).append(directionBtn);
    
    $dragEle.css({
        'left' : endPosition.left - (100/2),
        'top' : endPosition.top - (100/2),
    });
    $container.append($dragEle);
}


