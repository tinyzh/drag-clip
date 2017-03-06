<?php

    header('Content-type:text/html;charset=utf-8');
    $file = $_POST['base64'];


    $tmp  = base64_decode($file);
    $randStr = getRandChar(5);

    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
      $type = $result[2];
      $new_file = "./upload/".$randStr.".{$type}";
      if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file)))){
        echo '新文件保存成功：', $new_file;
      }

    }

    function getRandChar($length){
       $str = null;
       $strPol = "0123456789abcdefghijklmnopqrstuvwxyz";
       $max = strlen($strPol)-1;

       for($i=0;$i<$length;$i++){
        $str.=$strPol[rand(0,$max)];//rand($min,$max)生成介于min和max两个数之间的一个随机整数
       }

       return $str;
      }



?>