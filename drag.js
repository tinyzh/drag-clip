/**
 * Created by zhangchao on 17/3/6.
 */


var cArea = $('#ele');  // 最外层容器
var drag = $('#drag');  // 拖拽区域
var cAreaH = cArea.height(); //容器高度
var cAreaW = cArea.width();  // 容器宽度
var cAreaTop = getPosition(cArea).Y; // 容器距离浏览器上边界距离
var cAreaLeft = getPosition(cArea).X; // 容器距离浏览器左边界距离
var mousePosition, mouseStartX, mouseStartY, dragLeft, dragTop, dragMaxH, dragMaxW;  // 定义按下鼠标产生的变量

drag.on('mousedown',startDrag);

function startDrag(e){
    //console.log(e);
    e.preventDefault();
    mouseStartX = e.clientX; // 按下鼠标时，相对于浏览器边界的x坐标
    mouseStartY = e.clientY;  // 按下鼠标时，相对于浏览器边界的Y坐标
    dragLeft = drag.offset().left; // 按下鼠标时，拉伸框距离容器顶部的距离
    dragTop = drag.offset().top;  // 按下鼠标时，拉伸框距离容器顶部的距离

    dragMaxH = cAreaH - drag.height();  //垂直移动最大范围
    dragMaxW = cAreaW - drag.width();  // 水平移动最大范围
    mousePosition = e.target.id;  // 判断按下的位置 是中间还是边上的拉伸点
    console.log(mousePosition);
    $(document).on('mousemove',dragging);
    $(document).on('mouseup',clearDragEvent);
}









/**
 * 获取元素距离浏览器边界坐标
 * @param elem  容器
 */
function getPosition(elem){
    var elemX = elem.offset().left; // 相对于element.offsetParent节点的左边界偏移像素值
    var elemY = elem.offset().top;  // 相对于element.offsetParent节点的上边界偏移像素值
    while(var elemN = elem.parent()){  //遍历父元素
        elemX += elemN.offsetLeft;
        elemY += elemN.offsetTop;
    }
    return {X : elemX, Y : elemY};
};