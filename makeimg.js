/**
 * Created by zhangchao on 2017/3/7.
 */
var ele = document.getElementById('ele');
var wrap = $('#wrap');
var uploadBtn = $('.upload');

$('.go').on('click',function(){
    $('.drag').addClass('active');
        html2canvas(ele).then(function(canvas) {
            canvas.fillStyle = "#fff";
            var img = convertCanvasToImage(canvas);
            var minSizeFile = canvas.toDataURL('image/jpeg',0.7);
            base64_uploading(minSizeFile);
            wrap.html(img);
        });


});

uploadBtn.on('click',function(){
    var base64Data = wrap.find('img').attr('src');
    base64_uploading(base64Data);
});


function convertCanvasToImage(canvas){
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function base64_uploading(base64Data){
    $.ajax({
        type : 'POST',
        url : 'receive.php',
        data : {
            'base64' : base64Data
        },
        dataType : 'json',
        timeout : 50000,
        success : function(data){
            console.log(data);
        }
    })
}